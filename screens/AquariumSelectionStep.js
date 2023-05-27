import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { themeColors } from '../theme';
import OptionButton from '../components/optionButton';
import CustomButton from '../components/CustomButton';
import { AlignCenter } from 'react-native-feather';

const AquariumSelectionStep = ({ formData, setFormData, nextStep }) => {
    const [size, setSize] = useState(null);
    const [water, setWater] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [plant, setPlant] = useState("Plants");;
    const [filter, setFilter] = useState("Filter");
    const [waterHeater, setWaterHeater] = useState("Water Heater");

    const updateFormData = (key, value) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    const onNextStep = () => {
        if (size && water && accessories) {
          updateFormData('size', size);
          updateFormData('water', water);
          updateFormData('accessories', accessories);
          nextStep();
        } else {
          alert('Please choose all options before proceeding.');
        }
    };

    const onPressPlant = (option) => {
        setPlant(option);
        plant(option);
    };

    const onPressFilter = (option) => {
        setFilter(option);
        filter(option);
    };

    const onPresswWaterHeater = (option) => {
        setWaterHeater(option);
        waterHeater(option);
    };


    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Select Aquarium</Text>
                <Text style={styles.text}>Please select all the requirements to continue.</Text>
            </View>

            <TouchableOpacity style={styles.card}>
                <OptionButton 
                    options={['small', 'medium', 'large']} 
                    title="Size" 
                    selectOption={
                        (value) => setSize(value)
                    } 
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{')* consider the diameter range : Small <20cm, Medium, Large > 1m'}</Text>
            </View>

            <TouchableOpacity style={[styles.card, {backgroundColor: themeColors.Green}]}>
                <OptionButton 
                    options={['fresh', 'salt']} 
                    title="Type" 
                    selectOption={
                        (value) => setWater(value)
                    } 
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{' )* Type of your fish '}</Text>
            </View>

            <TouchableOpacity style={[styles.card, {backgroundColor: themeColors.LightBlue}]}>
                <OptionButton 
                    options={['Yes', 'No']} 
                    title="Accessories" 
                    selectOption={
                        (value) => setAccessories(value)
                    } 
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{' )* is there any filter, water heater, and other elements? '}</Text>
            </View>
            
            <View style={{alignItems:'center', position: 'absolute', top: 560, left:130,}}>
                <CustomButton 
                    text="Next" 
                    type='LIGHT'
                    onPress={onNextStep}
                    width={100} 
                    padding={12}
                />
            </View>

            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 5,
    },
    titleContainer: {
        marginVertical:20,
    },
    title: {
        fontSize:24,
        fontFamily:'CeraProBold',
        marginBottom:10,
        color: themeColors.bgLight,
        textAlign: 'center',
    },
    textContainer: {
        marginBottom:10,
    },
    text: {
        fontSize:12,
        fontFamily:'CeraProLight',
        marginBottom:10,
        color: themeColors.bgLight,
        textAlign: 'center',
    },
    textInput: {
        color: themeColors.bgLight,
    }, 
    questionText: {
        color: themeColors.bgLight,
    },

    card: {
        padding:5,
        backgroundColor: themeColors.Pink,
        borderRadius: 20,
        marginVertical:10,
    },
    option: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: themeColors.bgLight,
        marginHorizontal: 10,
        alignItems: 'center',
    },
      
    selectedOption: {
        backgroundColor: themeColors.bgDark,
        borderColor: themeColors.bgLight,
        elevation:55,
        borderWidth: 2,
    },
    optionText: {
        fontSize: 16,
        fontFamily:'CeraProBold',
        color: themeColors.bgDark,
    },
    selectedText: {
        color: themeColors.bgLight,
    },
})

export default AquariumSelectionStep;