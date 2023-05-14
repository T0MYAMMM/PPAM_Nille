import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { get, ref } from 'firebase/database';
import { db } from '../../firebaseConfig'; 

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
import ChatBotScreen from '../screens/ChatBotScreen';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import UploadImageScreen from '../screens/UploadImageScreen/UploadImageScreen';
import DetailFishScreen from '../screens/DetailFishScreen';
//import DrawerScreen from '../screens/DrawerScreen/DrawerScreen';

import ImageUploadContext from '../screens/ImageUploadContext';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const CustomHeader = ({ title, headerBg, iconColor, titleColor }) => {
    const navigation = useNavigation();
  
    return (
      <ScreenHeader
        title={title}
        headerBg={headerBg}
        iconColor={iconColor}
        titleAlign='center'
        menu
        right='more-vertical'
        rightFunction={() => console.log('right')}
        optionalIcon='bell'
        optionalFunc={() => console.log('optional')}
        optionalbadge={5}
        navigation={navigation}
        titleColor={titleColor}
      />
    );
  };

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
            tabBarPressColor: 'rgba(5, 22, 48, 0.2)', // menambahkan efek klik
        })}
    >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            header: () => <CustomHeader title="Home" headerBg="white" iconColor="#051630" titleColor='#051630'/>,
          }}
        />
        <Tab.Screen 
          name="MyAquarium" 
          component={MyAquariumScreen} 
          options={{
            header: () => <CustomHeader title="My Aquarium" headerBg="white" iconColor="#051630" titleColor='#051630'/>,
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            header: () => <CustomHeader title="Search" headerBg="white" iconColor="#051630" titleColor='#051630'/>,
          }}
        />
        <Tab.Screen 
          name="Nille" 
          component={ChatBotScreen} 
          options={{
            header: () => <CustomHeader  title="Nille" headerBg="white" iconColor="#051630" titleColor='#051630'/>,
          }}
        />
        <Tab.Screen 
          name="Premium" 
          component={PremiumScreen} 
          options={{
            header: () => <CustomHeader title="Premium" headerBg="white" iconColor="#051630"/>,
          }}
        />
    </Tab.Navigator>
  );
};