import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/images/login_logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();   
    const auth = getAuth();
    console.log(auth)

    const loginUser = async (username, password) => {
        console.log(username);
        console.log(password);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, username, password);
          console.log(userCredential.user);
          return userCredential.user;
          
        } catch (error) {
          throw error;
        }
      };

    const onSignInPressed = async () => {
        try {
            const user = await loginUser(username, password);
            console.log('User signed in:', user);
            navigation.navigate('Main');
            } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Wrong Password');
            console.log(errorMessage)
            }
    };
    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    
    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.root}>
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
        </ScrollView>
    );
 };

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#051630',
    },
    logo : {
        width: '70%',
        maxWidth: 300,
        maxHeight: 300,
    },
});

export default SignInScreen; 