import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebaseConfig';

const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');   
    const [errorMessage, setErrorMessage] = useState('');

    const onSendPressed  = async () => {
        try {
          console.log(app)
          await app.auth().sendPasswordResetEmail(email);

          alert('Berhasil kirim reset password');
          navigation.navigate("SignIn")

          //navigation.navigate('ResetPassword', { email: email });
        } catch (error) {
          if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
              setErrorMessage('Username or password doesn\'t match');
          } else if (error.code === 'auth/invalid-email') {
              setErrorMessage('Invalid email')
          } else if (error.code === 'auth/too-many-requests') {
              setErrorMessage('Access has been temporarily disabled. Please reset your password to restore access, or try again later.');
          } else {
              setErrorMessage(error.code);
          }
        }
    };

    const onBackToSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Reset your password</Text>         

            <CustomInput 
                placeholder = "Email" 
                value = {email} 
                setValue = {setEmail}
            />

            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}  

            <CustomButton 
                text = 'Send' 
                onPress={onSendPressed} 
                type='LIGHT'
                marginVertical={5}
            />

            <CustomButton   
                text = "Back to sign in" 
                onPress={onBackToSignInPressed} 
                type='TEXT'
                marginVertical={5}
            />  

        </View>
    );
 };

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#051630',
        justifyContent: 'center',
        padding:20
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
    errorText: {
        color: '#fa5e2a',
        marginHorizontal:40,
        marginBottom:10,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

export default ForgotPasswordScreen;