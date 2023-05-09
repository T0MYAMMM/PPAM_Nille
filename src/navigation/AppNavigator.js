import * as React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import HomeScreen from '../screens/HomeScreen';
import MyAquariumScreen from '../screens/MyAquariumScreen';
import SearchScreen from '../screens/SearchScreen';
import PremiumScreen from '../screens/PremiumScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import AIScreen from '../screens/AIScreen/AIScreen';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") {
                    iconName = focused ? 'home' : 'home';
                  } else if (rn === "MyAquarium") {
                    iconName = focused ? 'fish' : 'fish';
                  } else if (rn === "Search") {
                    iconName = focused ? 'search' : 'search';
                  } else if (rn === "AI") {
                    iconName = focused ? 'robot' : 'robot';
                  } else if (rn === "Premium") {
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
        <Tab.Screen name="AI" component={AIScreen} />
        <Tab.Screen name="Premium" component={PremiumScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen}></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}></Stack.Screen>
        <Stack.Screen name="NewPassword" component={NewPasswordScreen}></Stack.Screen>
        <Stack.Screen name="Main" component={BottomTabNavigator}></Stack.Screen>
      </Stack.Navigator>
  );
};

export default AppNavigator;