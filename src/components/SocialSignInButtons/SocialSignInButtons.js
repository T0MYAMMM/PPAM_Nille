import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import Google_Logo from '../../../assets/images/Google_Logo.png';


const SocialSignInButtons = () => {
    const onSignInGooglePressed = () => {
        console.warn('Sign in with Google');
    };

    return (
        <> 
            <CustomButton
                onPress={onSignInGooglePressed}
                bgColor="white"
                fgColor="#DD4D44"
                type={"WITHICON"}
                width={200}
                icon={
                    <Image
                        source={Google_Logo}
                        style={{ width: 30, height: 30, marginRight: 100 }}
                        resizeMode='contain'
                    />
                }>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Sign In with Google</Text>
                </View>
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