import React, { useState } from 'react';
import { ScrollView, View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { themeColors } from '../theme';

const fishList = [
    { id: '1', name: 'Ikan Koi', water: 'fresh', size: 'large' },
    { id: '2', name: 'Ikan Mas', water: 'fresh', size: 'medium' },
    { id: '3', name: 'Ikan Hiu', water: 'salt', size: 'large' },
    { id: '4', name: 'Ikan Cupang', water: 'fresh', size: 'small' },
    { id: '5', name: 'Ikan Kerapu', water: 'salt', size: 'medium' },
    // Tambahkan data ikan lainnya di sini
  ];

const FishSelectionStep = ({ formData, setFormData, nextStep, prevStep }) => {
    const [selectedFishId, setSelectedFishId] = useState(null);

    const selectFish = (fishId) => {
        const selectedFish = fishList.find((fish) => fish.id === fishId);
        setSelectedFishId(fishId);
        setFormData({
          ...formData,
          fish: selectedFish,
        });
    };

    console.log(formData.fish)

    const filteredFishList = fishList.filter((fish) => {
        let isMatch = fish.water === formData.water;
        if (formData.size === 'large') {
            isMatch = isMatch && (fish.size === 'small' || fish.size === 'medium' || fish.size === 'large');
        } else if (formData.size === 'medium') {
            isMatch = isMatch && (fish.size === 'small' || fish.size === 'medium');
        } else {
            isMatch = isMatch && fish.size === formData.size;
        }
        return isMatch;
    });

    console.log(formData)

    const onNextStep = () => {
        if (formData.fish != undefined){
            nextStep();
        } else {
            alert('Please choose all options before proceeding.');
        }
    }

    const onPrevStep = () => {
        prevStep();
    }

    return (
        <View>
            <ScrollView horizontal>
                {filteredFishList.map((fish) => (
                <TouchableOpacity
                    key={fish.id}
                    style={[
                    styles.card,
                    selectedFishId === fish.id && styles.selectedCard,
                    ]}
                    onPress={() => selectFish(fish.id)}
                >
                    <Text style={styles.fishName}>{fish.name}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.navigationButtons}>
                <Button title="Next" onPress={onNextStep} />
                <Button title="Prev" onPress={onPrevStep} />
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
    questionText: {
        color: themeColors.bgLight,
        marginBottom: 10,
    },
    fishName: {
        color: themeColors.bgLight,
        marginBottom: 5,
    },
    noFishText: {
        color: themeColors.bgLight,
        fontStyle: 'italic',
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
    },
    selectedCard: {
        backgroundColor: 'blue',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default FishSelectionStep;