import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}></Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}></Stack.Screen>        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;