import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    //const navigation = useNavigation();   
    
    const onSendPressed  = () => {
        //console.warn('SendPressed');
        navigation.navigate('NewPassword');
    };

    const onBackToSignInPressed = () => {
        //console.warn('onBackToSignInPressed');
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.root}>
            <Text style = {styles.title}>Reset your password</Text>         

            <CustomInput 
                placeholder = "Username" 
                value = {username} 
                setValue = {setUsername}
            />  

            <CustomButton text = 'Send' onPress={onSendPressed} />

            <CustomButton   
                text = "Back to sign in" 
                onPress={onBackToSignInPressed} 
                type='TERTIARY'
            />  

        </View>
    );
 };

 const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#051630',
        justifyContent: 'center',
    },
    text : {
        color: 'white',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default ForgotPasswordScreen; 