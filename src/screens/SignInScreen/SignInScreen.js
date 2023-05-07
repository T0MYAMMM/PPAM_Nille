import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/nille_logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    //const navigation = useNavigation();    

    const onSignInPressed = () => {
        //console.warn('Sign in');

        //validate
        navigation.navigate('Main');

    };
    const onForgotPasswordPressed = () => {
        //console.warn('On Forgot Password Pressed');
        navigation.navigate('ForgotPassword');
    };
    const onSignUpPressed = () => {
        //console.warn('On SignUpPress');
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

                <CustomButton 
                    text = "Don't have an account? create one" 
                    onPress={onSignUpPressed} 
                    type='TERTIARY'
                />  
            </View>
        </ScrollView>
    );
 };

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo : {
        width: '70%',
        maxWidth: 300,
        maxHeight: 300,
    },
});

export default SignInScreen; 