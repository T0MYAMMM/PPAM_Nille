import * as React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../../assets/nille_logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
//const LogoImage = require(Logo)

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const onLogoutPressed = () => {
        navigation.navigate('SignIn');
    };
    
    return (
      <LinearGradient colors={['#D7EEF1', '#D7EEF1']} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Image 
            source={Logo} 
            style={[styles.logo, {height:  height * 0.3}]} 
            resizeMode='contain'
          />
          <Text onPress={() => alert('Udah di Home Screen')} style={styles.titleText}> Home Screen</Text>
          <CustomButton 
            text = 'Logout'
            onPress={onLogoutPressed} 
          />
        </ScrollView>
      </LinearGradient>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#051630',
    padding:20,
  },
  logo : {
    width: '120%',
    maxWidth: 300,
    maxHeight: 300,
},
});

export default HomeScreen;