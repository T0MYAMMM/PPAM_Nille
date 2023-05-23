import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import OptionButton from '../components/optionButton';

const AquariumSelectionStep = ({ formData, setFormData, nextStep }) => {
    const [size, setSize] = useState(null);
    const [water, setWater] = useState(null);
    const [plants, setPlants] = useState(null);
    const [oxygen, setOxygen] = useState(null);

    const updateFormData = (key, value) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    const onNextStep = () => {
        if (size && water && plants && oxygen) {
          updateFormData('size', size);
          updateFormData('water', water);
          updateFormData('plants', plants === 'Yes' ? true : false);
          updateFormData('oxygen', oxygen);
          nextStep();
        } else {
          alert('Please choose all options before proceeding.');
        }
    };

    return (
        <View>
            <OptionButton 
                options={['small', 'medium', 'large']} 
                title="Aquarium Size" 
                selectOption={
                    (value) => setSize(value)
                } 
            />

            <OptionButton 
                options={['fresh', 'salt']} 
                title="Water Type" 
                selectOption={
                    (value) => setWater(value)
                } 
            />

            <OptionButton 
                options={['Yes', 'No']} 
                title="Are there aquatic plants?" 
                selectOption={
                    (value) => setPlants(value)
                    
                } 
            />

            <OptionButton 
                options={['low', 'medium', 'high']} 
                title="Oxygen Supply" 
                selectOption={
                    (value) => setOxygen(value)
                } 
            />
            
            <Button title="Next" onPress={onNextStep} />
        </View>
    );
};


const styles = StyleSheet.create({
    textInput: {
        color: themeColors.bgLight,
    }, 
    questionText: {
        color: themeColors.bgLight,
    },
})

export default AquariumSelectionStep;