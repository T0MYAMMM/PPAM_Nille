import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../../firebaseConfig';

const ConfirmEmailScreen = () => {
    const navigation = useNavigation();
    
    const onResendCodePressed = async () => {
        try {
            const user = app.auth().currentUser;
            await user.sendEmailVerification();
            alert('Email verifikasi telah dikirim ulang ke alamat email Anda');
        } catch (error) {
            alert(error.message);
        }
    };

    const onBackToSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Konfirmasi Email</Text>         
            <Text style={styles.text}>Silakan buka email Anda dan klik tautan verifikasi untuk menyelesaikan proses pendaftaran akun.</Text>
            <CustomButton 
                text = "Kirim Ulang Email Verifikasi" 
                onPress={onResendCodePressed} 
                type='SECONDARY'
            />
            <CustomButton 
                text = "Kembali ke Halaman Login" 
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
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        textAlign: 'center',
    },
    link: {
        color: '#FDB075',
    },
});

export default ConfirmEmailScreen;