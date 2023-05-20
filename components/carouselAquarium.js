import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { themeColors } from '../theme';
import moment from 'moment';

const { width } = Dimensions.get('window');
const cardWidth = 0.8*width


const TaskList = [
  {
      id: '1',
      date: new Date(), // date hari ini
      tasks: [
        {
          time: '06.00',
          task: 'Feed aquarium a',
        },
        {
          time: '12.00',
          task: 'Feed aquarium b',
        },
      ],
  },
  {
      id: '2',
      date: new Date(Date.now() - 86400000), // date kemarin
      tasks: [
        {
          time: '12.00',
          task: 'Feed aquarium c',
        },
        {
          time: '18.00',
          task: 'Feed aquarium d',
        },
      ],
  },
  {
      id: '3',
      date: new Date(Date.now() + 86400000), // date besok
      tasks: [
        {
          time: '18.00',
          task: 'Feed aquarium e',
        },
        {
          time: '24.00',
          task: 'Feed aquarium f',
        },
      ],
  },
];

// Fungsi untuk membandingkan date, jika date sama return 'Hari ini', jika date kemarin return 'Kemarin', jika date besok return 'Besok'
const getDateLabel = (date) => {
  const today = moment();
  const taskDate = moment(date);
  
  if (taskDate.isSame(today, 'day')) {
    return 'Hari Ini';
  } else if (taskDate.isSame(moment().subtract(1, 'days'), 'day')) {
    return 'Kemarin';
  } else if (taskDate.isSame(moment().add(1, 'days'), 'day')) {
    return 'Besok';
  } else {
    return taskDate.format('DD MMM YYYY'); // Jika tidak termasuk hari ini, kemarin, atau besok, format date menjadi 'DD MMM YYYY'
  }
}

const carouselAquarium = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatlistRef = useRef(null);
    const tasksSortedByDate = [...TaskList].sort((a, b) => a.date - b.date);
    const todayIndex = tasksSortedByDate.findIndex(task => getDateLabel(task.date) === 'Hari Ini');

    useEffect(() => {
      if (flatlistRef.current) {
          flatlistRef.current.scrollToIndex({ index: todayIndex, animated: true });
      }
    }, []);

    const onScrollToIndexFailed = (info) => {
      const wait = new Promise(resolve => setTimeout(resolve, 500));
      wait.then(() => {
          flatlistRef.current?.scrollToIndex({ index: info.index, animated: true });
      });
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index)
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:  50 }).current;
  
    return (
      <View style={styles.container}>
        <FlatList 
          data={tasksSortedByDate}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ];
  
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.3]
            });
  
            return (
              <Animated.View style={{...styles.box, opacity}}>
                <Text style={styles.dateTitle}>{getDateLabel(item.date)}</Text>
                <FlatList
                  data={item.tasks}
                  keyExtractor={(task, taskIndex) => `${item.id}-task-${taskIndex}`}
                  renderItem={({ item: task }) => (
                    <View style={styles.taskContainer}>
                      <Text style={styles.time}>{task.time}</Text>
                      <Text style={styles.task}>{task.task}</Text>
                    </View>
                  )}
                  style={{flex: 1}}
                />
              </Animated.View>
            );
          }}
          keyExtractor={item => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig} 
          ref={flatlistRef}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',        
      alignItems: 'center',
    },
    taskContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    box: {
      flex:1,
      height:200,
      width: cardWidth,
      margin: 20,
      borderRadius: 20,
      backgroundColor: themeColors.Blue,
      alignItems:'center',
      justifyContent:'center',
      padding:20,
    },
    dateTitle: {
      fontSize:24,
      fontWeight: '800',
      marginBottom:10,
      color: themeColors.bgLight,
      textAlign: 'center',
    },
    time: {
      fontSize:20,
      fontWeight: '800',
      marginRight: 10,
      color: themeColors.bgLight,
      textAlign: 'center'
    },
    task: {
      fontSize:17,
      color: themeColors.bgLight,
      textAlign: 'center'
    },
  });
  
  export default carouselAquarium;