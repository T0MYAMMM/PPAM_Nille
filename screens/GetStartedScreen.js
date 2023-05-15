import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/images/login_logo.png';
import CustomButton from '../components/CustomButton';

const GetStartedScreen = ({navigation}) => {
    const {height} = useWindowDimensions();   

    const onStartedPressed = () => {
        navigation.navigate('SignUp');
    };
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height:  height * 0.3}]} 
                resizeMode='contain'
            />

            <View style={styles.space}/>

            <CustomButton 
                text = 'Get Started With Nille' 
                bgColor={'white'} 
                width={250} 
                color={'#051630'} 
                onPress={onStartedPressed}
                type={'LIGHT'}
                fontSize={16}
                marginVertical={5}
            />

            <CustomButton 
                text = "Already a member? Sign in here" 
                onPress={onSignInPressed} 
                type='TEXT'
                color={'white'}
                fontWeight={'bold'}
                fontSize={16}
                marginVertical={5}
            />  
            
        </View>
    );
 };

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        padding: 20,
        backgroundColor:'#051630',
    },
    logo : {
        flexDirection:'column',
        width: '70%',
        maxWidth: 300,
        maxHeight: 300,
    },
    space: {
        height: 250,
    },
});

export default GetStartedScreen; 