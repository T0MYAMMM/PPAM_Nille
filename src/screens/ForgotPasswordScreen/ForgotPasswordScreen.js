import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { app } from '../../../firebaseConfig';

const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');   
    
    const onSendPressed  = async () => {
        try {
          await app.auth().sendPasswordResetEmail(email);
          navigation.navigate('ResetPassword', { email: email });
        } catch (error) {
          alert(error.message);
        }
    };

    const onBackToSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.root}>
            <Text style = {styles.title}>Reset your password</Text>         

            <CustomInput 
                placeholder = "Email" 
                value = {email} 
                setValue = {setEmail}
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
});

export default ForgotPasswordScreen;