import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { themeColors } from '../theme';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

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
    const email = userDocSnapshot.data().email;

      // Menambahkan username ke objek formData

    const dbRef = ref(db, 'aquariums');
      
    console.log("sampai sono");
    //console.log(username);
    console.log(formData.reminder);
    //hasil console log formData.reminder : {"foodType": "palet", "time": [2023-05-23T00:50:13.585Z, 2023-05-23T08:50:13.585Z], "times": 2}
      // Mendapatkan jumlah entri saat ini dalam folder 'aquariums'
    
        // Membuat objek data baru dengan ID berupa bilangan bulat yang berurutan
    const newData = {
      name: "akuarium",
      size: formData.size,
      water: formData.water,
      accessories : formData.accessories,
      fish: formData.fish,
      reminder: formData.reminder,
      email: email
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
    <View style={styles.container}>

      <View style={{ flex: 1,  padding: 16 }}> 
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
          <View style={{ alignItems:'center', justifyContent:'center', flex:1 }}>
            <Text style={styles.title}> Tambahkan Akuarium? </Text>

            <View style={{alignItems:'center', position: 'absolute', top: 360, left:125,}}>
                <CustomButton 
                    text="Submit" 
                    type='LIGHT'
                    onPress={handleSubmit}
                    width={100} 
                    padding={12}
                />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize:12,
    fontFamily:'CeraProLight',
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