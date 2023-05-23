import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { themeColors } from '../theme';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


import AquariumSelectionStep from './AquariumSelectionStep';
import FishSelectionStep from './FishSelectionStep';
import ReminderSettingStep from './ReminderSettingStep';

import { app, db, auth, firestoreDb } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ref, set, push } from 'firebase/database';

const AddAquariumScreen = () => {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // Mengambil referensi ke folder 'aquariums' dalam Firestore Realtime Database
    const currentUser = auth.currentUser;
    console.log("sampai sini");
    const userDocRef = doc(firestoreDb, 'users', currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    console.log("sampai sene")

      // Mengambil nilai username dari dokumen pengguna
    const username = userDocSnapshot.data().username;

      // Menambahkan username ke objek formData

    const dbRef = ref(db, 'aquariums');
      
    console.log("sampai sono");
    console.log(username);
      // Mendapatkan jumlah entri saat ini dalam folder 'aquariums'
    
        // Membuat objek data baru dengan ID berupa bilangan bulat yang berurutan
    const newData = {
      name: "aqoea",
      size: formData.size,
      water: formData.water,
      plants: formData.plants,
      oxygen: formData.oxygen,
      fish: formData.fish,
      reminder: formData.reminder,
      username: username
    };
    
        // Menambahkan data baru ke folder 'aquariums' dengan ID berupa bilangan bulat
    push(dbRef, newData)
      .then(() => {
          // Navigasi ke halaman MyAquariumScreen setelah berhasil menambahkan data
          Alert.alert('Success', 'Data added successfully.');
        
          navigation.navigate('aquarium');
      })
      .catch((error) => {
        console.error('Error adding data: ', error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {step === 1 && (
        <AquariumSelectionStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <FishSelectionStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ReminderSettingStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <View>
          <Text style={styles.title}>Form Data:</Text>
          <Text style={styles.text}>{JSON.stringify(formData, null, 2)}</Text>
          <Button 
            title="Submit" 
            onPress = {handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize:24,
    fontWeight: '800',
    marginBottom:10,
    color: themeColors.bgLight,
    textAlign: 'center',
  },
  text: {
    fontSize:17,
    marginBottom:10,
    color: themeColors.bgLight,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddAquariumScreen;