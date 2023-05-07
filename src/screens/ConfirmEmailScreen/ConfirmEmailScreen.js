import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const ConfirmEmailScreen = ({navigation}) => {
    const [code, setCode] = useState('');
    //const navigation = useNavigation(); 
    
    const onConfirmPressed  = () => {
        console.warn('ConfirmPressed');
        navigation.navigate('Main');
    };

    const onResendCodePressed = () => {
        console.warn('onResendCodePressed');
    };

    const onBackToSignInPressed = () => {
        console.warn('onBackToSignInPressed');
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.root}>
                <Text style = {styles.title}>Confirm Sign Up</Text>         

                <CustomInput placeholder = "Enter your confirmation code" value = {code} setValue = {setCode}/>  

                <CustomButton text = 'Confirm' onPress={onConfirmPressed} />

                <CustomButton 
                    text = "Resend code" 
                    onPress={onResendCodePressed} 
                    type='SECONDARY'
                />

                <CustomButton 
                    text = "Back to sign in" 
                    onPress={onBackToSignInPressed} 
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
    text : {
        color: 'grey',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default ConfirmEmailScreen; 