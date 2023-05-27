import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import Google_Logo from '../assets/images/Google_Logo.png';

const SocialSignInButtons = ({ googleLogin }) => {
    const onSignInGooglePressed = () => {
        console.warn('Sign in with Google');
        googleLogin();
    };

    return (
        <> 
            <CustomButton
                onPress={onSignInGooglePressed}
                type={"WITHICON"}
                text="Sign In with Google"
                width={220}
                icon={
                    <Image
                        source={Google_Logo}
                        style={{ width: 30, height: 30 }}
                        resizeMode='contain'
                    />
                }>
            </CustomButton>
        </>
  );
};

const styles = StyleSheet.create({
    buttonContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      color: '#051630',
      fontSize: 14,
    },
  });

export default SocialSignInButtons;