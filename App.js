import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import { AppLoading } from 'expo';
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
