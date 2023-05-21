import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import ImageUploadContext from './ImageUploadContext';
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


  //kebutuhan upload image
  const [fishData, setFishData] = useState([]);
  const handleImageUpload = useContext(ImageUploadContext);
  const listAllImages = async () => {
    const storageRef = ref(storage, 'uploaded_images/');
    try {
      const result = await listAll(storageRef);
      const url = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(ref(storage, item.fullPath));
          return url;
        })
      );
      setFishData(url);
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadImagePressed = () => {
    navigation.navigate('UploadImageScreen', {
      handleImageUpload });
  };

  useFocusEffect(() => {
    listAllImages();
  });
  //kebutuhan upload image!!!


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

            <Text style={styles.titleText}>Uploaded images</Text>

            <Text style={styles.subTitleText}> 
                Jika ingin menambahkan data card, silakan upload gambar dengan menekan tombol di bawah 
            </Text>

            <View alignItems="center" marginBottom={30}>
                <CustomButton 
                type="LIGHT" 
                text="Upload Image" 
                width={250} 
                onPress={onUploadImagePressed} 
                marginVertical={5}
                />
            </View>
            
            <View style={styles.itemsContainer}>
                {fishData.map((url, index) => (
                <TouchableOpacity key={index} style={styles.item}>
                    <Image source={{ uri: url }} style={styles.itemImage} resizeMode="contain" />
                    <Text style={styles.itemTitle}>File {index + 1}</Text>
                </TouchableOpacity>
                ))}
            </View>
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
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  item: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: themeColors.Purple,
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  itemImage: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    padding:5,
    //marginVertical: 8,
    //padding: 10,
    //margin:10,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding:5,
  },
});

export default AquariumDetailScreen;