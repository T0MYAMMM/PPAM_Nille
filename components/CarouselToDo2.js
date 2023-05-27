import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, useWindowDimensions, Alert, TouchableOpacity, Modal, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Carousel from "react-native-snap-carousel";
import { themeColors } from "../theme";
import Checkbox from 'expo-checkbox';

import { db, auth } from '../firebaseConfig.js';
import { onValue, ref, push, set } from 'firebase/database';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const Task = ({ item, index }) => {
    const [isChecked, setChecked] = useState(false);
  
    return (
      <View style={styles.taskContainer}>
          <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? themeColors.Red : undefined}
          />
          <Text style={styles.taskText}>{item.taskName}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
};


const CarouselToDo2 = () => {
    const [todos, setTodos] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [newTime, setNewTime] = useState('');
    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const windowWidth = useWindowDimensions().width;
  
    const addTask = async (index) => {
        await setCurrentDayIndex(index % todos.length);
        setModalVisible(true);
    };

    const handleAddTask = () => {
        if (newTask !== '' && newTime !== '') {
            const user = auth.currentUser;
            const currentDay = todos[(currentDayIndex+4)%7];
            const newTaskId = Object.keys(currentDay.tasks).length + 1;
            const todoRef = ref(db, `ToDo/${user.uid}/${currentDay.day}/tasks/${newTaskId}`);
    
            const newTaskData = {
                taskName: newTask,
                time: newTime
            };
    
            set(todoRef, newTaskData)
                .then(() => {
                    const newTasks = [...todos];
                    newTasks[(currentDayIndex + 4) % 7].tasks[newTaskId-1] = newTaskData;
                    setTodos(newTasks);
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Gagal menambahkan tugas baru');
                });
        }
        setModalVisible(false);
        setNewTask('');
        setNewTime('');
    };
  
    useEffect(() => {
        const user = auth.currentUser;
        const todoRef = ref(db, `ToDo/${user.uid}/`);

        // use onValue to listen for changes in the data
        onValue(todoRef, (snapshot) => {
            const data = snapshot.val();
        
            if (data) {
                let arrData = [];
                for (let day in data) {
                    let tasksArray = [];
                    if (data[day].tasks) {
                        for (let taskId in data[day].tasks) {
                            tasksArray.push({
                                id: taskId,
                                ...data[day].tasks[taskId],
                            });
                        }
                    }
                    arrData.push({day: day, tasks: tasksArray});
                }
                arrData.sort((a, b) => {
                    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    const dayA = days.indexOf(a.day);
                    const dayB = days.indexOf(b.day);
                    return dayA - dayB;
                });
                setTodos(arrData);
            }
        });
        setSelectedDayIndex((new Date().getDay() + 6) % 7);
    }, []);
  
    const renderItem = ({ item, index }) => {
        return (
          <View style={styles.card}>
            <Text style={styles.dayText}>{item.day}</Text>
            <FlatList
                data={item.tasks ? Object.values(item.tasks) : []}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                    <Task item={item} index={index} />
                )}
            />
            <TouchableOpacity onPress={() => addTask(index)}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
    };
  
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tambah Task</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setNewTask}
                            value={newTask}
                            placeholder="Nama task"
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setNewTime}
                            value={newTime}
                            placeholder="Waktu"
                        />
                        <Button title="Tambah" onPress={handleAddTask} />
                    </View>
                </View>
            </Modal>

            <Carousel
                containerCustomStyle={{overflow: 'visible'}}
                data={todos}
                renderItem={renderItem}
                itemWidth={260}
                sliderWidth={windowWidth}
                slideStyle={{display: 'flex', alignItems: 'center'}}
                firstItem={selectedDayIndex}
                loop={true}
                inactiveSlideScale={0.77}
                inactiveSlideOpacity={0.5}
            />
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeColors.bgDark,
    },
    card: {
        padding: 20,
        backgroundColor: themeColors.LightGreen,
        borderRadius: 20,
        margin: 10,
    },
    dayText: {
        fontSize: 24,
        fontFamily:'CeraProBold',
        color: themeColors.bgDark,
        marginBottom: 20,
    },
    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
        fontFamily: 'CeraProMedium',
        color: themeColors.bgDark,
    },
    timeText: {
        fontSize: 16,
        fontFamily: 'CeraProMedium',
        color: themeColors.bgDark,
        marginLeft:10,
    },
    checkbox: {
        margin: 8,
     },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalInput: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CarouselToDo2;