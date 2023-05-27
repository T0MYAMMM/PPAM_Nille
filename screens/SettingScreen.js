import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, FlatList, Alert } from 'react-native';
import { themeColors } from '../theme';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

import { auth, firestoreDb } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import CarouselToDo from '../components/carouselToDo';

import { WorldIcon as WorldSolid, MoonIcon as MoonSolid, ClockIcon as ClockSolid } from 'react-native-heroicons/solid';
import { Ionicons } from '@expo/vector-icons';
import { theme } from 'native-base';


const SettingScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(null);
    const [alarm, setAlarm] = useState(null);


    const handleLogout = async () => {
        try {
          // Hapus token autentikasi dari penyimpanan lokal (AsyncStorage)
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
        console.log("Logout dulu")
        handleLogout();
      }
      
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            try {
              const userDocRef = doc(firestoreDb, 'users', user.uid);
              const docSnapshot = await getDoc(userDocRef);
              if (docSnapshot.exists()) {
                setUser(docSnapshot.data());
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);

  

    const onEditPressed = () => {
        console.warn("mau edit profile bos?")
    }

    const onSettingPressed = () => {
        console.warn("mau buka setting?")
    }

    const onShopPressed = () => {
        console.warn("mau buka marketplace bos?")
    }

    const onWalletPressed = () => {
        console.warn("mau liat wallet bos?")
    }

    const onDarkModePressed = () => {
      if (darkMode){
        setDarkMode(false);
      } else {
        setDarkMode(true);
        Alert.alert('Success', 'Turn to Dark Mode!');
      }
      
    }
    const onAlarmPressed = () => {
      if (alarm){
        setAlarm(false);
      } else {
        setAlarm(true);
        Alert.alert('Success', 'Now the alarm is on!');
      }
    }
    



    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:  50 }).current;

    return (
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>

            <TouchableOpacity style={styles.optionContainer} onPress={onShopPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.Purple}]} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/shop.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Marketplace</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={onWalletPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.Orange}]}  >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/wallet.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Billing Details</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.optionButton} >
                    <MoonSolid  color={themeColors.bgDark} size={30}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Dark Mode</Text>
                </View>

                <Ionicons 
                  name = "toggle" 
                  size = {40} 
                  style = {{ transform: [{ rotate: darkMode? '0deg' : '180deg' } ]}} 
                  color = {darkMode ? themeColors.Pink : themeColors.bgLight }
                  onPress={onDarkModePressed}
                />
            
            </View>

            <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.optionButton} >
                    <ClockSolid  color={themeColors.bgDark} size={30}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Alarm</Text>
                </View>

                <Ionicons 
                  name = "toggle" 
                  size = {40} 
                  style = {{ transform: [{ rotate: alarm ? '0deg' : '180deg' } ]}} 
                  color = {alarm ? themeColors.Pink : themeColors.bgLight } 
                  onPress={onAlarmPressed}
                />
            
            </View>


            <TouchableOpacity style={styles.optionContainer} onPress={onLogoutPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.LightGreen}]} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/logout.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Logout</Text>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: themeColors.bgDark,
        alignItems: 'center',
    },
    ImageCard: {
        width: 130,
        height:130,
        borderRadius:20,
        backgroundColor: themeColors.Purple,
        alignItems:'center',
        justifyContent: 'center'
    },
    image: {
        width:120,
        height:120,
        borderRadius:20,
        resizeMode: "contain"
    },
    CarouselContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    CarouselCard: {
        width: 300,
        height:200,
        borderRadius:20,
        alignItems:'center',
        justifyContent: 'center',
        padding:10,
        margin:10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginVertical: 10,
    },
    optionButton: {
        alignItems: 'center',
        justifyContent:'center',
        width:40,
        height:40,
        backgroundColor: themeColors.Pink,
        borderRadius:15,
        marginLeft:10,
      },
    optionTextContainer: {
        flex: 1, // Here
    },
    optionText: {
        fontSize: 16,
        color: themeColors.bgLight,
        fontFamily:'CeraProMedium',
        marginLeft:25,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileTextContainer:{
        alignItems: 'center',
        marginVertical: 20,
    },
    nameText: {
        textAlign:'center',
        fontSize: 20,
        color: themeColors.bgLight,
        fontFamily:'CeraProBold',
    },
    usernameText: {
        textAlign:'center',
        fontSize: 17,
        color: themeColors.bgLight,
        fontFamily:'CeraProLight',
    },
    joined: {
        fontSize: 16,
        color: '#3C2A21',
    },
    location: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumInfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aquariumLabel: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051630',
    },
});

export default SettingScreen;