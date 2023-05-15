//Dependencies
import React, { useState, useEffect } from 'react';
import { LogBox, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

//Newer Style
import { themeColors } from '../theme';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftOutline, MagnifyingGlassIcon as MagnifyingGlassOutline, GiftIcon as GiftOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftSolid, MagnifyingGlassCircleIcon as MagnifyingGlassCircleSolid, GiftIcon as GiftSolid } from 'react-native-heroicons/solid';

//Firebase
import { get, ref } from 'firebase/database';
import { db } from '../firebaseConfig'; 

// Screen
// - Stack
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import UploadImageScreen from '../screens/UploadImageScreen';
import DetailFishScreen from '../screens/DetailFishScreen';
// - Bottom Tab
import HomeScreen from '../screens/HomeScreen';
import MyAquariumScreen from '../screens/MyAquariumScreen';
import SearchScreen from '../screens/SearchScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
// - Header
import ScreenHeader from '../components/ScreenHeader';
// - Passing data and update
import ImageUploadContext from '../screens/ImageUploadContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

//Stack Navigation
const StackNavigator = () => {
  const [fishData, setFishData] = useState([]);
  useEffect(() => {
    // Mengambil data ikan dari Firebase dan menyimpannya dalam state
    const getFishData = async () => {
      try {
        const snapshot = await get(ref(db, 'ornamental_data_fish/'));
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
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#051630'}}}
      >
        
        <Stack.Screen name="GetStarted" component={GetStartedScreen}></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}></Stack.Screen>        
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}></Stack.Screen>
        <Stack.Screen name="Main" component={BottomTabNavigation} />

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

const BottomTabNavigation = () => {
  const CustomHeader = ({ title, headerBg, iconColor, titleColor }) => {
    const navigation = useNavigation();
  
    return (
      <ScreenHeader
        title={title}
        headerBg={headerBg}
        iconColor={iconColor}
        titleAlign='center'
        menu
        onMenuPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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
          initialRouteName="Main"
          screenOptions={({ route }) => ({
              headerShown: true,
              tabBarShowLabel: false,
              tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused),
              tabBarStyle: {
                marginBottom: 25,
                borderRadius: 50,
                marginHorizontal: 20,
                backgroundColor: themeColors.bgLight,
      
              },
              tabBarItemStyle: {
                marginTop: 5,
                
              }
          })}
      >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="aquarium" component={MyAquariumScreen} />
          <Tab.Screen name="search" component={SearchScreen} />
          <Tab.Screen name="nille" component={ChatBotScreen} />
          <Tab.Screen name="premium" component={PremiumScreen} />  
      </Tab.Navigator>
  );
};

const menuIcons = (route, focused)=> {
  let icon;
  
  if (route.name === 'home') {
    icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color={themeColors.bgButton} />
  } else if (route.name === 'aquarium') {
    icon =  focused? <HeartSolid size="30" color={themeColors.bgLight} /> : <HeartOutline size="30" strokeWidth={2} color={themeColors.bgButton} />
  } else if(route.name==='search'){
    icon =  focused? <MagnifyingGlassCircleSolid size="50" color={themeColors.bgLight} /> : <MagnifyingGlassOutline size="30" strokeWidth={2} color={themeColors.bgButton} />
  } else if(route.name==='nille'){
    icon =  focused? <ChatBubbleOvalLeftSolid size="30" color={themeColors.bgLight} /> : <ChatBubbleOvalLeftOutline size="30" strokeWidth={2} color={themeColors.bgButton} />
  } else if(route.name==='premium'){
    icon =  focused? <GiftSolid size="30" color={themeColors.bgLight} /> : <GiftOutline size="30" strokeWidth={2} color={themeColors.bgButton} />
  } 

  
  let buttonClass = focused? "bg-[#32918C]": "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  )
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
};

export default AppNavigation;