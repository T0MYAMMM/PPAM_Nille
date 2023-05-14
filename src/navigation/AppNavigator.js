import React from 'react';

//Navigator Child
import BottomTabNavigator from './BottomTabNavigator';
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