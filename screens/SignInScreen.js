import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/images/login_logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { firestoreDb, auth, db } from '../firebaseConfig';
//import { GoogleSignIn } from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeColors } from '../theme';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

import {EyeIcon as EyeSolid, EyeSlashIcon as EyeSlashSolid } from 'react-native-heroicons/solid';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {height} = useWindowDimensions();   
    const auth = getAuth();
    //auth.currentUser = null;
    const saveAccessTokenToStorage = async (accessToken) => {
        try {
          await AsyncStorage.setItem('authToken', accessToken);
          console.log('Access token saved to AsyncStorage successfully');
        } catch (error) {
          console.log('Error saving access token to AsyncStorage:', error);
        }
    };

    const checkEmailVerificationStatus = (user) => {
        const checkInterval = setInterval(async () => {
            // Refresh user data
            await user.reload();
    
            if (user.emailVerified) {
                // Stop checking once the email is verified
                clearInterval(checkInterval);
    
                // Update the Firestore document
                const userProfile = {
                    username: user.displayName,
                    email: user.email,
                    email_verified: user.emailVerified,
                };
                await setDoc(doc(firestoreDb, 'users', user.uid), userProfile, {merge: true});

                }
        }, 5000); // Check every 5 seconds
    };

    const googleLogin = async () => {
        console.log("Google Sign In")
    };

    const loginUser = async (username, password) => {
        try {
                const userCredential = await signInWithEmailAndPassword(auth, username, password);
                const authToken = auth.currentUser.stsTokenManager.accessToken;

                if (auth.currentUser.emailVerified) {
                    console.log('User signed in:', userCredential.user);
                    saveAccessTokenToStorage(authToken);
                    setErrorMessage('')
                    return true;
                } else {
                    auth.currentUser = null;
                    //console.error(errorMessage);
                    throw new Error('Email is not verified.'); // Memasukkan pesan kesalahan;
                }
           } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                throw new Error('Username or password doesn\'t match');
            } else if (error.code === 'auth/too-many-requests') {
                throw new Error('Access has been temporarily disabled. Please reset your password to restore access, or try again later.');
            } if (error.code === 'auth/invalid-email') {
                throw new Error('Invalid email');
            } else {
                //console.error(errorMessage);
                throw error;
            }
        }
    };

    const onSignInPressed = async () => {
        try {
            const authorized = await loginUser(username, password);
            if (authorized) {
                checkEmailVerificationStatus(auth.currentUser);
                navigation.navigate('Main');
            } else {
                setErrorMessage('Unauthorized access.');
                // Menampilkan pesan kesalahan jika tidak terotorisasi
            }
        } catch (error) {
            setErrorMessage(error.message);
            // Menampilkan pesan kesalahan
        }
    };
    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    
    return (
        <View style={styles.container}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height:  height * 0.3}]} 
                resizeMode='contain'
            />
            <CustomInput 
                placeholder = "Email"
                value = {username}
                setValue = {setUsername}
                width={'80%'}
            />

            <CustomInput
                placeholder = "Password"
                value = {password}
                setValue = {setPassword}
                secureTextEntry = {!isPasswordVisible}
                    rightIcon={
                        <TouchableOpacity onPress={() => setIsPasswordVisible(prevState => !prevState)}>
                        {isPasswordVisible ? <EyeSolid size={20} color={themeColors.Pink} /> : <EyeSlashSolid size={20} color={themeColors.DarkBlue} />}
                        </TouchableOpacity>
                    }
            />  

            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

            <CustomButton 
                text = 'Sign In' 
                onPress={onSignInPressed} 
                type='LIGHT'
                width={'80%'}
                height={50}
                padding={12}    
            />

            <CustomButton 
                text = 'Forgot password?' 
                onPress={onForgotPasswordPressed} 
                type='TEXT'
                fontSize={16}
            />

            <SocialSignInButtons
                googleLogin={googleLogin}
            />

            <CustomButton 
                text = "Don't have an account? create one" 
                onPress={onSignUpPressed} 
                type='TEXT'
                color={'white'}
                fontSize={16}
            />  
        </View>
    );
 };

 const styles = StyleSheet.create({
    container: {
        flex:1, 
        padding: 16,
        backgroundColor:themeColors.bgDark,
        alignItems:'center',
        justifyContent:'center',
    },
    logo : {
        flexDirection:'column',
        width: '70%',
        maxWidth: 300,
        maxHeight: 300,
    },
    errorText: {
        color: themeColors.Red,
        marginHorizontal:40,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

export default SignInScreen; 