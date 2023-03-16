import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { SystemFonts } from 'expo';

const BebasNeueProBold = require('../../fonts/BebasNeuePro-Bold.ttf');
const PoppinsRegular = require('../../fonts/Poppins-Regular.ttf');

function HomeScreen() {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'BebasNeuePro-Bold': BebasNeueProBold,
          'Poppins-Regular': PoppinsRegular,
        });
        setFontLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#020109', '#051630']} style={styles.container}>
      <Text
        onPress={() => alert('Udah di Home Screen')}
        style={styles.titleText}>
        NILLE
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#6EA9B1',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  titleText: {
    fontSize: 53,
    fontWeight: 'bold',
    fontFamily: 'BebasNeuePro-Bold',
    color: '#D1BDC6',
  },
});

export default HomeScreen;