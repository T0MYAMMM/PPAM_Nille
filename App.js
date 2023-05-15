import React from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <AppNavigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

export default App;
