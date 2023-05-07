import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === myAquariumName) {
              iconName = focused ? 'logo-twitter' : 'logo-twitter';

            } else if (rn === searchName) {
              iconName = focused ? 'search' : 'search-outline';

            } else if (rn === premiumName) {
              iconName = focused ? 'list' : 'list-outline';
            
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

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={myAquariumName} component={MyAquariumScreen} />
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={premiumName} component={PremiumScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;