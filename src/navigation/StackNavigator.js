import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { get, ref } from 'firebase/database';
import { db } from '../../firebaseConfig'; 

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import BottomTabNavigator from './BottomTabNavigator';
import UploadImageScreen from '../screens/UploadImageScreen/UploadImageScreen';
import DetailFishScreen from '../screens/DetailFishScreen';

import ImageUploadContext from '../screens/ImageUploadContext';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [fishData, setFishData] = useState([]);
  useEffect(() => {
    // Mengambil data ikan dari Firebase dan menyimpannya dalam state
    const getFishData = async () => {
      try {
        const snapshot = await get(ref(db, 'ornamental_fish_data/'));
        const data = snapshot.val();

        if (data) {
          const fishArray = Object.keys(data).map((key) => ({
            id_spesies: key,
            ...data[key],
          }));
          setFishData(fishArray);
        }
      } catch (error) {
        console.log('Error retrieving fish data:', error);
      }
    };

    getFishData();
  }, []);

  const handleImageUpload = (url) => {
    console.log('URL Gambar:', url);
    // Lakukan tindakan atau logika yang sesuai dengan URL gambar di sini
  };

  return (
    <ImageUploadContext.Provider value={handleImageUpload}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen}></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}></Stack.Screen>        
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}></Stack.Screen>
        <Stack.Screen name="Main" component={BottomTabNavigator} />

        <Stack.Screen
          name="DetailFishScreen"
          component={DetailFishScreen}
          options={({ route }) => {
            const { fishId } = route.params;
            const fish = fishData.find((item) => item.id_spesies === fishId);
            return { fish };
          }}
        />
          
        <Stack.Screen
          name="UploadImageScreen"
          component={UploadImageScreen}
          initialParams={{ handleImageUpload: handleImageUpload }}
        />
      </Stack.Navigator>
    </ImageUploadContext.Provider>
  );
};

export default StackNavigator;