import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { themeColors } from '../theme';

import CarouselToDo from '../components/carouselToDo';
import CustomButton from '../components/CustomButton';

const speciesList = [
  { id: 'species1', name: 'Guppy' },
  { id: 'species2', name: 'Betta' },
  // tambahkan sebanyak yang dibutuhkan
];

const AquariumDetailScreen = ({ navigation }) => {
  const [speciesId, setSpeciesId] = useState(speciesList[0].id);
  const [size, setSize] = useState('');
  const [cleaningSchedule, setCleaningSchedule] = useState('');
  const [filterType, setFilterType] = useState('');

  const onSubmit = () => {
    // Proses data form di sini, seperti melakukan POST request ke API atau menyimpan ke local storage
  };

  const onLogoutPressed = () => {
    console.warn("Sabar ya fiturnya lagi di develop");
  };

  return (
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>
        

        <View style={styles.content}>
                
          <Text style={styles.titleText}>Data Aquarium</Text>

          <Text style={styles.subTitleText}> Disini ada list data aquarium </Text>

          <View style={styles.carouselContainer}>
            <CarouselToDo/>
          </View>

          <Text style={styles.subTitleText}> Disini nanti ada upload images </Text>

          <CustomButton
                text = 'Tombol'
                onPress={onLogoutPressed} 
                type='LIGHT'
                width='50%'
                height={50}
                padding={12}
                marginVertical={15}
            />
        </View>     
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize:24,
    fontWeight: '800',
    marginBottom:10,
    color: themeColors.Blue,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: themeColors.bgDark,
  },
  content: {
    alignItems:'center',
    justifyContent:'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    color: themeColors.bgLight,
    paddingTop:20,
  },
  subTitleText : {
    fontSize: 16, 
    color: themeColors.bgLight, 
    fontWeight: 'normal', 
    textAlign:'center', 
    paddingTop:10, 
    paddingBottom:20,
  },
  carouselContainer: {
    height: 240, // adjust this value as needed
    marginBottom: 20, // adjust this value as needed
  },
});

export default AquariumDetailScreen;