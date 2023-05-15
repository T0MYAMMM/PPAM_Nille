import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { app } from '../firebaseConfig';

const ResetPasswordScreen = ({ route, navigation }) => {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { email, code } = route.params;
  
    const onResetPressed = async () => {
      setLoading(true);
      try {
        if (password !== passwordRepeat) {
          throw new Error('Passwords do not match');
        }
  
        await app.auth().confirmPasswordReset(code, password);
        await app.auth().signInWithEmailAndPassword(email, password);
  
        navigation.navigate('Main');
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
  
    if (!email) {
      return (
        <View style={styles.root}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.error}>Email is not provided.</Text>
        </View>
      );
    }
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset Password</Text>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <Text style={styles.subtitle}>
              Enter your new password below and confirm
            </Text>
          )}
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder="Repeat Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry={true}
          />
          <CustomButton
            text={loading ? 'Loading...' : 'Reset'}
            onPress={onResetPressed}
          />
        </View>
      </ScrollView>
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
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginVertical: 10,
    },
});

export default ResetPasswordScreen;