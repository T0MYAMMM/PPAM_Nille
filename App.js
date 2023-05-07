import React from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
//import SignInScreen from './src/screens/SignInScreen';
//import SignUpScreen from './src/screens/SignUpScreen';
//import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen';
//import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen/ConfirmEmailScreen';
//import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
//import StackNavigator from './src/navigation/StackNavigator';
//import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.root}>
        <AppNavigator/>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

export default App;
