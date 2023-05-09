import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/images/login_logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();   

    const onSignInPressed = () => {
        navigation.navigate('Main');
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
                />

                <CustomInput
                    placeholder = "Password"
                    value = {password}
                    setValue = {setPassword}
                    secureTextEntry
                />  

                <CustomButton text = 'Sign In' onPress={onSignInPressed} />

                <CustomButton 
                    text = 'Forgot password?' 
                    onPress={onForgotPasswordPressed} 
                    type='TERTIARY'
                />

                <SocialSignInButtons/>

                <View style={styles.space}/>

                <CustomButton 
                    text = "Don't have an account? create one" 
                    onPress={onSignUpPressed} 
                    type='TERTIARY'
                />  

                <View style={styles.space}/>

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
    space: {
        height: 50,
    },
});

export default SignInScreen; 