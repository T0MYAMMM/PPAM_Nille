import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, useWindowDimensions, Alert, TouchableOpacity, Modal, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Carousel from "react-native-snap-carousel";
import { themeColors } from "../theme";
import Checkbox from 'expo-checkbox';

import { ref, onValue } from 'firebase/database';
import { db, auth, firestoreDb } from '../firebaseConfig';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CarouselToDo = () => {
    const [todos, setTodos] = useState([
        {
            day: "Monday",
            tasks: [
                ["Pekerjaan 1", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Tuesday",
            tasks: [
                ["Pekerjaan 1", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Wednesday",
            tasks: [
                ["Pekerjaan 1", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Thursday",
            tasks: [
                ["Pekerjaan 1", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Friday",
            tasks: [
                ["Pekerjaan 1", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Saturday",
            tasks: [
                ["Feed Aquarium A", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
        {
            day: "Sunday",
            tasks: [
                ["Feed Aquarium A", "08.00"], 
                ["Pekerjaan 2", "12.00"], 
                ["Pekerjaan 3", "16.00"],
            ],
        },
      ]);


    const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [newTime, setNewTime] = useState('');
    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const windowWidth = useWindowDimensions().width;
  
    // Membuat addTask menjadi fungsi asynchronous
    const addTask = async (index) => {
        await setCurrentDayIndex(index % todos.length); // Menunggu hingga setCurrentDayIndex selesai
        setModalVisible(true);
    };

    handleAddTask = () => {
        if(newTask !== '' && newTime !== ''){
            const newTasks = [...todos];
            if (newTasks[(currentDayIndex+4) % 7]) {
                newTasks[(currentDayIndex+4) % 7].tasks.push([newTask, newTime]);
                setTodos(newTasks);
            } else {
                console.error(`Invalid index: ${currentDayIndex}`);
            }
        }
        setModalVisible(false);
        // Menambahkan ini untuk mereset field input setelah tugas ditambahkan
        setNewTask('');
        setNewTime('');
    };
  
    useEffect(() => {
        setSelectedDayIndex((new Date().getDay() + 6) % 7);  // update index to start from "Minggu" not "Senin"
    }, []);
  
    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.card}>
          <Text style={styles.dayText}>{item.day}</Text>
          <FlatList
            data={item.tasks}
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
  }
  
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
          <Text style={styles.taskText}>{item[0]}</Text>
          <Text style={styles.timeText}>{item[1]}</Text>
      </View>
    );
  }

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

export default CarouselToDo;