import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Navigator Child
import StackNavigator from './StackNavigator';

//const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <StackNavigator/>
  );
};

export default AppNavigator;