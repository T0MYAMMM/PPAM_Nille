import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import ImageUploadContext from '../ImageUploadContext';

const PremiumScreen = () => {
  const navigation = useNavigation();
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

  useFocusEffect(() => {
    listAllImages();
  });

  const onUploadImagePressed = () => {
    navigation.navigate('UploadImageScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    padding: 20,
    backgroundColor: '#051630',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 20,
  },
  subTitleText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
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
    backgroundColor: '#fff',
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

export default PremiumScreen;