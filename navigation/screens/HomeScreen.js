import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LogoImage = require('../../assets/images/logo.png')

function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <LinearGradient colors={['#D7EEF1', '#D7EEF1']} style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <Text
        onPress={() => alert('Udah di Home Screen')}
        style={styles.titleText}>
        Home Screen
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Premium</Text>
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
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#051630',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default HomeScreen;