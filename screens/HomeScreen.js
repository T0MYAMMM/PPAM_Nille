import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

import { auth } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CarouselToDo from '../components/carouselToDo';
import CarouselToDo2 from '../components/CarouselToDo2';

import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

import { themeColors } from '../theme';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const handleLogout = async () => {
      try {
        // Hapus token autentikasi dari penyimpanan lokal (AsyncStorage)
        //const auth = getAuth();
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
            <CarouselToDo2/>
          </View>

        </View>     


        <View style={{ alignItems:'center', marginTop:40, }}>

          <TouchableOpacity style={styles.premiumCard}>
            <Image
              source={require("../assets/images/nille_logo.png")}
              style={styles.image}
              resizeMode='contain'
            />

            <Text style={styles.promoTitle}>Nille Premium</Text>

            <Text style={styles.promoText}>Subscribe to use our complete features!</Text>
          </TouchableOpacity>
          
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
    image: {
      top: -56,
      position: 'absolute',
      width:'80%',
      height:130,
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
      height: 400, // adjust this value as needed
      marginBottom: 80, // adjust this value as needed
    },
    premiumCard: {
      flex:1,
      width:'90%',
      height:200,
      backgroundColor: themeColors.Green,
      alignItems:'center',
      borderRadius:20,
    },
    promoTitle: {
      marginTop:65,
      fontSize: 24,
      fontFamily:'CeraProBold',
      textAlign: 'center', 
      color: themeColors.bgDark,
      paddingTop:20,
    },
    promoText: {
      fontSize: 16, 
      color: themeColors.bgDark, 
      fontFamily:'CeraProMedium',
      lineHeight:20,
      textAlign:'center', 
      paddingTop:10, 
      paddingBottom:20,
      marginHorizontal:20,
    },
});

  export default HomeScreen;