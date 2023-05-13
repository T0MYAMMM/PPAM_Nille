import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 

// Screen
import HomeScreen from '../screens/HomeScreen';
import MyAquariumScreen from '../screens/MyAquariumScreen';
import SearchScreen from '../screens/SearchScreen';
import PremiumScreen from '../screens/PremiumScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ChatBotScreen from '../screens/ChatBotScreen/ChatBotScreen';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import UploadImageScreen from '../screens/UploadImageScreen/UploadImageScreen';

import ImageUploadContext from '../screens/ImageUploadContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                    iconName = focused ? 'home' : 'home';
                  } else if (route.name === "MyAquarium") {
                    iconName = focused ? 'fish' : 'fish';
                  } else if (route.name === "Search") {
                    iconName = focused ? 'search' : 'search';
                  } else if (route.name === "Nille") {
                    iconName = focused ? 'robot' : 'robot';
                  } else if (route.name === "Premium") {
                    iconName = focused ? 'crown' : 'crown';
                  }
                // You can return any component that you like here!
                return <FontAwesome5 name={iconName} size={24} color={color} />;
            },
            tabBarStyle: { 
                height: 65,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:'white'
            },
            activeTintColor: '#007aff',
            inactiveTintColor: 'grey',
            tabStyle: { paddingBottom: 0, paddingTop: 0},
            tabBarIconStyle: { marginVertical: 0 },
            tabBarLabelStyle: { marginBottom: 10 },
            headerShown: true,
            headerTitleAlign: 'left',
            headerTitleStyle: { fontFamily: 'sans-serif', fontWeight:'bold', fontSize: 20, color: 'white' },
            headerStyle: { backgroundColor: '#007aff' },
            tabBarPressColor: 'rgba(5, 22, 48, 0.2)', // menambahkan efek klik
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyAquarium" component={MyAquariumScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Nille" component={ChatBotScreen} />
        <Tab.Screen name="Premium" component={PremiumScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
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
          <Stack.Screen name="Main" component={BottomTabNavigator}></Stack.Screen>
          <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} initialParams={{ handleImageUpload: handleImageUpload }} ></Stack.Screen>
        </Stack.Navigator>
      </ImageUploadContext.Provider>
  );
};

export default AppNavigator;