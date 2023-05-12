import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import CustomButton from '../../components/CustomButton/CustomButton';
import ImageUploadContext from '../ImageUploadContext';

const UploadImageScreen = ({ navigation, route }) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access media library is required!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (image === null) {
      Alert.alert('No image selected!');
      return;
    }
  
    setUploading(true);
  
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const imageName = moment().format('DDMMYYYY-HHmmss');

      const storageRef = ref(storage, `uploaded_images/${imageName}`);
      await uploadBytes(storageRef, blob);
      //await ref.putFile(blob);
      //await uploadBytes(ref, blob);
      //console.log('berhasil')
  
      const url = await getDownloadURL(storageRef).then((url) => {
        return url;
      })

      route.params.handleImageUpload(url);
  
      setUploading(false);
      Alert.alert('Photo uploaded successfully!');
      setImage(null);

      navigation.goBack();
    } catch (error) {
      console.log(error);
      //console.log('ngentot')
      setUploading(false);
      Alert.alert('An error occurred while uploading the photo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <CustomButton text="Pick an Image" onPress={pickImage} type='LIGHT'/>

        {image && (
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
        )}
        <CustomButton text="Upload Image" onPress={uploadImage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#051630',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default UploadImageScreen;