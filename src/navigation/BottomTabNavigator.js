import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MyAquariumScreen from '../screens/MyAquariumScreen';
import SearchScreen from '../screens/SearchScreen';
import PremiumScreen from '../screens/PremiumScreen';

const homeName = "Home";
const myAquariumName = "MyAquarium";
const searchName = "Search";
const premiumName = "Premium"

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
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
            } else if (rn === "AIScreen") {
              iconName = focused ? 'robot' : 'robot';
            } else if (rn === "Premium") {
              iconName = focused ? 'crown' : 'crown';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#051630',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyAquarium" component={MyAquariumScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="AI" component={AIScreen} />
        <Tab.Screen name="Premium" component={PremiumScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;