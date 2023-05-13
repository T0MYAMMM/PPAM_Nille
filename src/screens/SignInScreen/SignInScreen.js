import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/images/login_logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {height} = useWindowDimensions();   
    const auth = getAuth();
    //auth.currentUser = null;
    console.log(auth)

    const saveAccessTokenToStorage = async (accessToken) => {
        try {
          await AsyncStorage.setItem('authToken', accessToken);
          console.log('Access token saved to AsyncStorage successfully');
        } catch (error) {
          console.log('Error saving access token to AsyncStorage:', error);
        }
    };

    const loginUser = async (username, password) => {
        console.log(username);
        console.log(password);
        try {
                const userCredential = await signInWithEmailAndPassword(auth, username, password);
                const authToken = auth.currentUser.stsTokenManager.accessToken;
                console.log(authToken);

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
                placeholder = "Username"
                value = {username}
                setValue = {setUsername}
                width={'80%'}
            />

            <CustomInput
                placeholder = "Password"
                value = {password}
                setValue = {setPassword}
                secureTextEntry
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

            <SocialSignInButtons/>

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
        backgroundColor:'#051630',
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
        color: '#fa5e2a',
        marginHorizontal:40,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

export default SignInScreen; 