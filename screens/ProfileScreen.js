import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native';
import { themeColors } from '../theme';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

import { auth, firestoreDb } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig"; // import Firebase storage
import { updateDoc } from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore';
//import CarouselToDo from '../components/carouselToDo';


const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');

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
                const userDocRef = doc(firestoreDb, 'users', auth.currentUser.uid);
                onSnapshot(userDocRef, (doc) => {
                    setUser(doc.data());
                });
                } catch (error) {
                console.log(error);
                }
            } else {
                setUser(null);
            }
        });
      
        return () => unsubscribe();
    }, []);

    const onEditProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            // Mengambil URI gambar dari array assets, bukan dari properti uri langsung
            let uri = result.assets[0].uri;
            //console.log(uri);
            setProfilePicture(uri);
    
            if (uri) {
                console.log(uri)
                let imageName = auth.currentUser.uid + '_' + Date.now() + '_' + uri.split("/").pop();
                let imageRef = ref(storage, "profilePictures/" + imageName);
                let response = await fetch(uri);
                let blob = await response.blob();
                await uploadBytes(imageRef, blob);
                console.log("kontolll")
                // get the download URL and update the user's avatar in Firestore
                let downloadURL = await getDownloadURL(imageRef);
                console.log(downloadURL)
                let userDocRef = doc(firestoreDb, "users", auth.currentUser.uid);
                console.log(userDocRef)
                await updateDoc(userDocRef, {
                    avatar: downloadURL,
                });
            }
        }
    };

    const onEditPressed = () => {
        console.warn("mau edit profile bos?")
    }

    const onSettingPressed = () => {
        navigation.navigate("Setting")
    }

    const onShopPressed = () => {
        console.warn("mau buka marketplace bos?")
    }

    const onWalletPressed = () => {
        console.warn("mau liat wallet bos?")
    }


    return (
        <ScrollView showsVerticalScrollclearicator={true} contentContainerStyle={styles.container}>

            <TouchableOpacity style={styles.ImageCard} onPress={onEditProfilePicture}>
                <Image 
                    style={styles.image}
                    source={user && user.avatar ? { uri: user.avatar } : require('../assets/images/user-profile.jpg')}
                />
            </TouchableOpacity>

            <View style={styles.profileTextContainer}>
                <Text style={styles.nameText}>{user ? (user.fname + ' ' + user.lname) : 'Guest'}</Text>
                <Text style={styles.usernameText}>{user ? '@' + user.username : '@guest'}</Text>
            </View>
            
            <CustomButton 
                text={"Edit Profile"}
                width={154}
                
                type='LIGHT'
                padding={8}
                height={40}
                onPress={onEditPressed}
            />

            
            <TouchableOpacity style={styles.optionContainer} onPress={onSettingPressed}>
                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/setting.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Setting</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

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

export default ProfileScreen;