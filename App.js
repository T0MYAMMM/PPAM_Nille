import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

export default App;
