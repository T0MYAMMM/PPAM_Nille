import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { themeColors } from '../theme';

const ConfirmEmailScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const onResendCodePressed = async () => {
        try {
            const user = auth.currentUser;
            await user.sendEmailVerification();
            alert('Email verifikasi telah dikirim ulang ke alamat email Anda');
            navigation.navigate('SignIn');
        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                setErrorMessage('Invalid email')
            } else {
                setErrorMessage(error.code);
            }
        }
    };

    const onBackToSignInPressed = () => {
        auth.currentUser = null;
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Konfirmasi Email</Text>         
            <Text style={styles.text}>Silakan buka email Anda dan klik tautan verifikasi untuk menyelesaikan proses pendaftaran akun.</Text>
            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
            <CustomButton 
                text = "Kirim Ulang Email Verifikasi" 
                onPress={onResendCodePressed} 
                type='LIGHT'
                padding={12}
            />
            <CustomButton 
                text = "Kembali ke Halaman Login" 
                onPress={onBackToSignInPressed} 
                type='TEXT'
                marginVertical={1}
            />  
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:themeColors.bgDark,
        justifyContent: 'center',
    },
    text : {
        color: themeColors.bgLight,
        marginVertical: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: themeColors.bgLight,
        margin: 10,
        textAlign: 'center',
    },
    errorText: {
        color: themeColors.Red,
        marginHorizontal:40,
        marginBottom:10,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

export default ConfirmEmailScreen;