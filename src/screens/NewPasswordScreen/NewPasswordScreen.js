import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const NewPasswordScreen = ({navigation}) => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    //const navigation = useNavigation();   

    const onSubmitPressed  = () => {
        console.warn('SendPressed');
        navigation.navigate('SignIn')
        //navigation.navigate('SignIn')
    };
    const onBackToSignInPressed = () => {
        //console.warn('onBackToSignInPressed');
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.root}>
                <Text style = {styles.title}>Reset your password</Text>         

                <CustomInput placeholder = "Code" value = {code} setValue = {setCode}/>

                <CustomInput placeholder = "Enter your new password" value = {newPassword} setValue = {setNewPassword}/>  

                <CustomButton text = 'Submit' onPress={onSubmitPressed} />

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

export default NewPasswordScreen; 