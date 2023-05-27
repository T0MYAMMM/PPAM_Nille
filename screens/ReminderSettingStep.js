import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const foodTypes = ['palet', 'cacing', 'lainnya'];

const ReminderSettingStep = ({ formData, setFormData, nextStep, prevStep }) => {
    const [feedingTimes, setFeedingTimes] = useState(1);
    const [selectedTimes, setSelectedTimes] = useState([new Date()]);
    const [showTimePicker, setShowTimePicker] = useState([false]);
    const [selectedFoodType, setSelectedFoodType] = useState(foodTypes[0]);

    const handleConfirm = (index, time) => {
        const updatedTimes = [...selectedTimes];
        updatedTimes[index] = time;
        setSelectedTimes(updatedTimes);
        setShowTimePicker(prev => {
            const updatedPickerStatus = [...prev];
            updatedPickerStatus[index] = false;
            return updatedPickerStatus;
        });
    };

    const setReminder = () => {
        const timeStrings = selectedTimes.map(time => time.toISOString());
        setFormData({
            ...formData,
            reminder: {
                times: feedingTimes,
                time: timeStrings,
                foodType: selectedFoodType,
            },
        });
    };

    const pickerItems = [...Array(feedingTimes)].map((_, index) => (
        <View key={index} style={styles.timePickerContainer}>
            <Text style={styles.label}>Pakan {["Pertama", "Kedua", "Ketiga"][index]}:</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    const updatedPickerStatus = [...showTimePicker];
                    updatedPickerStatus[index] = true;
                    setShowTimePicker(updatedPickerStatus);
                }}
            >
                <Text style={styles.buttonText}>
                  {selectedTimes[index] ? selectedTimes[index].toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Pilih Waktu'}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={showTimePicker[index]}
                mode="time"
                onConfirm={(time) => handleConfirm(index, time)}
                onCancel={() => {
                    const updatedPickerStatus = [...showTimePicker];
                    updatedPickerStatus[index] = false;
                    setShowTimePicker(updatedPickerStatus);
                }}
            />
        </View>
    ));

    const onNextStep = () => {
        console.log(feedingTimes)
        console.log(selectedTimes)
        console.log(selectedFoodType)

        if (feedingTimes != undefined && selectedTimes != undefined && selectedFoodType != undefined){
            setReminder();
            nextStep();
        } else {
            alert('Please choose all options before proceeding.');
        }
    }

    const onPrevStep = () => {
        prevStep();
    }

    return (
        <View style={styles.container}>

            <View style={{alignItems:'center', marginTop: 5}}>
                <Text style={styles.title}>Waktu Pengingat:</Text>
            </View>
            
            <Picker
                selectedValue={feedingTimes}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setFeedingTimes(itemValue);
                    setSelectedTimes([...Array(itemValue)].map(() => new Date()));
                    setShowTimePicker([...Array(itemValue)].map(() => false));
                }}
            >
                <Picker.Item label="1x" value={1} />
                <Picker.Item label="2x" value={2} />
                <Picker.Item label="3x" value={3} />
            </Picker>

            {pickerItems}

            <View style={{alignItems:'center', marginTop: 15}}>
                <Text style={styles.title}>Jenis Pakan:</Text>     
            </View>    
           

            <Picker
                selectedValue={selectedFoodType}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedFoodType(itemValue)}
            >
                {foodTypes.map((foodType, index) => (
                    <Picker.Item key={index} label={foodType} value={foodType} />
                ))}
            </Picker>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onPrevStep}>
                    <Text style={styles.buttonText}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onNextStep}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bgDark,
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'CeraProBold',
        color: themeColors.bgLight,
        marginBottom: 20,
    },
    timePickerContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: 'CeraProMedium',
        color: themeColors.bgLight,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        backgroundColor: themeColors.Blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: themeColors.bgLight,
        fontSize: 18,
        fontFamily: 'CeraProBold',
    },
    picker: {
        backgroundColor: themeColors.LightBlue,
        borderRadius: 20,
        color: themeColors.bgDark,
        fontSize: 18,
        fontFamily: 'CeraProMedium',
        marginBottom:10,
    },
});

export default ReminderSettingStep;