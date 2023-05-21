import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

import { themeColors } from '../theme';
import CarouselToDo from '../components/carouselToDo';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const handleLogout = async () => {
      try {
        // Hapus token autentikasi dari penyimpanan lokal (AsyncStorage)
        const auth = getAuth();
        await signOut(auth);
        await AsyncStorage.removeItem('authToken');
        // Menghapus currentUser atau menetapkannya sebagai null
        //auth.currentUser = null;
  
        // Navigasi ke halaman login
        navigation.navigate('SignIn');
      } catch (error) {
        console.log('Error logging out:', error);
      }
    };

    const onLogoutPressed = () => {
      handleLogout();
    }
      
    return (
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>
        <View style={styles.content}>
                
          <Text style={styles.titleText}>Welcome to Nille</Text>

          <Text style={styles.subTitleText}> Disini ada upcoming to do </Text>

          <View style={styles.carouselContainer}>
            <CarouselToDo/>
          </View>

          <CustomButton
            text={"Logout"}
            width={'80%'}
            type='LIGHT'
            padding={12}
            height={50}
            onPress={onLogoutPressed}
          />
        </View>     
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: themeColors.bgDark,
    },
    content: {
      alignItems:'center',
      justifyContent:'center',
    },
    titleText: {
      fontSize: 24,
      fontFamily:'CeraProBold',
      textAlign: 'center', 
      color: themeColors.bgLight,
      paddingTop:20,
    },
    subTitleText : {
      fontSize: 16, 
      color: themeColors.bgLight, 
      fontFamily:'CeraProLight',
      textAlign:'center', 
      paddingTop:10, 
      paddingBottom:20,
    },
    carouselContainer: {
      height: 240, // adjust this value as needed
      marginBottom: 20, // adjust this value as needed
    },
});

  export default HomeScreen;