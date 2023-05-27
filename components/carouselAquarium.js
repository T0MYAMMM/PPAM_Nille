import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions, Button } from 'react-native';
import { themeColors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { ref, onValue } from 'firebase/database';
import { db, auth, firestoreDb } from '../firebaseConfig';

import CustomButton from './CustomButton';

const { width } = Dimensions.get('window');
const cardWidth = 0.8*width

const carouselAquarium = () => {
    const [aquariumData, setAquariumData] = useState([]);
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatlistRef = useRef(null);
    const todayIndex = currentIndex; // Selalu mulai dari aquarium pertama

    const id_spesies = "aa01";

    useEffect(() => {
      const dbRef = ref(db, 'aquariums');
      
      // Mendapatkan pengguna saat ini
      //const authUser = getAuth().currentUser;
      console.log(auth)
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const aquariumArray = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter((aquarium) => aquarium.email === auth.currentUser.email); // Filter berdasarkan email
      
          setAquariumData(aquariumArray);
        }
      });
    }, []);

    const AquariumList = aquariumData;

    const onScrollToIndexFailed = (info) => {
      const wait = new Promise(resolve => setTimeout(resolve, 500));
      wait.then(() => {
          flatlistRef.current?.scrollToIndex({ index: info.index, animated: true });
      });
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index);
        }
      }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:  50 }).current;

    const formatTime = (isoTimes) => {
      return isoTimes.map(isoTime => {
        const time = isoTime.split('T')[1].split('.')[0];
        const [hours, minutes] = time.split(':');
        const formattedTime = `${hours.padStart(2, '0')}.${minutes.padStart(2, '0')}`;
        return formattedTime;
      });
    };

    return (
      <View style={styles.container}>
        <FlatList 
          data={AquariumList}
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

            const onCardPress = () => {
                navigation.navigate('AquariumDetailScreen');
            };

            return (
              <TouchableOpacity onPress={onCardPress}>
                <Animated.View style={{...styles.box, opacity}}>
                  <View style={styles.boxContent}>
                    <Text style={styles.title}>Aquarium </Text>
                    <Text style={styles.title}> {index + 1}</Text>
                  </View>

                  <View style={styles.boxContent}>
                    <Text style={styles.text}>Species : </Text>
                    <Text style={styles.text}> {item.fish.nama_populer}</Text>
                  </View>

                  <View style={styles.boxContent}>
                    <Text style={styles.text}>Water : </Text>
                    <Text style={styles.text}> {item.water}</Text>
                  </View>

                  <View style={styles.boxContent}>
                    <Text style={styles.text}>Size : </Text>
                    <Text style={styles.text}> {item.size}</Text>
                  </View>

                  <View style={styles.boxContent}>
                    <Text style={styles.text}>Feeding Time : </Text>
                    <Text style={styles.text}> {formatTime(item.reminder.time)}</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver:  false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig} 
          ref={flatlistRef}
          onScrollToIndexFailed={onScrollToIndexFailed}
          ListFooterComponent={() => (
            <View style={{ width: cardWidth, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
              <CustomButton 
                text="Tambah Aquarium"
                type='LIGHT'
                onPress={() => navigation.navigate('AddAquariumScreen')}
              />
            </View>
          )}
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
  box: {
    height:200,
    width: cardWidth,
    margin: 20,
    borderRadius: 20,
    backgroundColor: themeColors.Blue,
    alignItems:'center',
    justifyContent:'center',
    padding:20,
  },
  boxContent:{
    flexDirection:'row',
    alignItems: 'baseline',
  },

  title: {
    fontSize:24,
    fontFamily: 'CeraProBold',
    marginBottom:10,
    color: themeColors.bgLight,
    textAlign: 'center',
  },
  text: {
    fontSize:18,
    fontFamily: 'CeraProMedium',
    marginBottom:10,
    color: themeColors.bgLight,
    textAlign: 'center',
  },
  detail: {
    fontSize:17,
    color: themeColors.bgLight,
    textAlign: 'center'
  },
});

export default carouselAquarium;