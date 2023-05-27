import React, { useEffect, useState } from 'react';
import { ScrollView, View, Button, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreav } from 'react-native';
import { themeColors } from '../theme';
import { db } from '../firebaseConfig.js';
import { onValue, ref } from 'firebase/database';
import { MagnifyingGlassIcon as MagnifyingGlassSolid } from 'react-native-heroicons/solid';

import CustomButton from '../components/CustomButton';

const FishSelectionStep = ({ formData, setFormData, nextStep, prevStep }) => {
    const [selectedFishId, setSelectedFishId] = useState(null);
    const [allFishData, setAllFishData] = useState([]);
    const [displayFishData, setDisplayFishData] = useState([]);
    const [query, setQuery] = useState('');
  
    useEffect(() => {
      const fishRef = ref(db, 'ornamental_data_fish/');
      onValue(fishRef, (snapshot) => {
        const data = snapshot.val();
        const newPosts = Object.keys(data).map((key) => {
          return { id_spesies: key, ...data[key] };
        });
        setAllFishData(newPosts);
        setDisplayFishData(newPosts);
      });
    }, []);
  
    const cardColors = [
        themeColors.bgLight,
    ];

    const onSearchFish = () => {
      const filteredFish = allFishData.filter((fish) =>
        fish.nama_populer.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayFishData(filteredFish);
    };
  
    const selectFish = (fishId) => {
      const selectedFish = allFishData.find((fish) => fish.id_spesies === fishId);
      setSelectedFishId(fishId);
      setFormData({
        ...formData,
        fish: selectedFish,
      });
    };

    console.log(formData.fish)

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
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <MagnifyingGlassSolid size={20} color={themeColors.Red} />
                <TextInput
                style={styles.searchInput}
                placeholder="Search Fish"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={onSearchFish}
                returnKeyType="search"
                />
            </View>
        
            <ScrollView style={styles.scrollView}>
                <View style={styles.fishGrid}>
                {displayFishData.map((fish, index) => (
                    <TouchableOpacity
                    key={fish.id_spesies}
                    style={[
                        styles.card,
                        { backgroundColor: cardColors[index % cardColors.length] },
                        selectedFishId === fish.id_spesies && styles.selectedCard,
                    ]}
                    onPress={() => selectFish(fish.id_spesies)}
                    >
                        <Image style={styles.fishImage} source={{uri: fish.imageUrl}} />
                        <Text style={styles.fishName} numberOfLines={2}>
                            {fish.nama_populer}
                        </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>

            <View style={{ alignItems:'center', flexDirection:'row', position: 'absolute', top: 560, left:220 }}>
                <CustomButton 
                    text="Next" 
                    type='LIGHT'
                    onPress={nextStep}
                    width={100} 
                    padding={12}
                />
            </View>

            <View style={{ alignItems:'center', flexDirection:'row', position: 'absolute', top: 560, left:30 }}>
                <CustomButton 
                    text="Prev" 
                    type='LIGHT'
                    onPress={prevStep}
                    width={100} 
                    padding={12}
                />
            </View>

        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        borderRadius:30,
        marginBottom: 80, // adjust this value to the height of your navigation buttons
    },
    fishName: {
        color: themeColors.bgLight,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        width: '48%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        margin: 10,
        backgroundColor: themeColors.bgButton,
        alignItems: 'center',
    },
    navigationButtons: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',  // change to match your theme
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.bgLight,
        borderRadius: 75,
        paddingHorizontal: 10,
        width: '90%',
        height: 40,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal:17,
    },
    searchInput: {
        marginLeft: 8,
        color:themeColors.bgDark,
        fontWeight:'bold',
        fontSize: 16,
        flex: 1,
    },
    fishGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    card: {
        width: '48%',
        padding: 12,
        borderRadius: 30,
        marginBottom: 10,
    },
    selectedCard: {
        backgroundColor: themeColors.LightGreen,
        borderColor: themeColors.bgDark,
        borderWidth: 5,
    },
    fishImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    fishName: {
        color: themeColors.bgLight,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        color: themeColors.bgDark,
        textAlign: 'center',
    },
});

export default FishSelectionStep;