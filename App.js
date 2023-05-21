import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';

import AppNavigation from './navigation/AppNavigation';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'CeraProBold': require('./assets/fonts/CeraProBold.otf'),
    'CeraProLight': require('./assets/fonts/CeraProLight.otf'),
    'CeraProMedium': require('./assets/fonts/CeraProMedium.otf'),
    'CeraProRegularItalic': require('./assets/fonts/CeraProRegularItalic.otf'),
  });

  return (
    <Provider store={store}>
      <Spinner
        // Spinner akan ditampilkan jika fonts belum dimuat
        visible={!fontsLoaded}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      {fontsLoaded && <AppNavigation />}
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default App;