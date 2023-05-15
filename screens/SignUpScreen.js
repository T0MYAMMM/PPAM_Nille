import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { app } from '../firebaseConfig';

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);

    const registerUser = async (email, password) => {
        try {
          const signInMethods = await app.auth().fetchSignInMethodsForEmail(email);
          if (signInMethods && signInMethods.length > 0) {
            setIsEmailRegistered(true);
            return null;
          }
    
          const userCredential = await app.auth().createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;
    
          await user.updateProfile({
            displayName: username
          });
          return user;
        } catch (error) {
          //console.error(error);
          throw error;
        }
    };
    
    const onRegisterPressed = async () => {
        try {
          validateForm();
          const newUser = await registerUser(email, password);
    
          if (newUser != null) {
            navigation.navigate('ConfirmEmail');
          }
    
        } catch (error) {
          //console.error(error);
          if (isEmailRegistered) {
            setErrorMessage('This email is already registered');
          } else if (error.code === 'auth/invalid-email') {
            setErrorMessage('Invalid email');
          } else {
            setErrorMessage(error.message);
          }
        } finally {
          setIsEmailRegistered(false);
        }
    };

    const isValidEmail = (email) => {
        // Regex untuk memvalidasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Mengembalikan true jika email valid
        return emailRegex.test(email);
    };
      
    const isValidPassword = (password) => {
        // Regex untuk memvalidasi password
        // Minimal 8 karakter, setidaknya 1 huruf besar, 1 huruf kecil, dan 1 angka
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        
        // Mengembalikan true jika password valid
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        if (!username || !email || !password || !passwordRepeat) {
            throw new Error('All fields are required');
        }
        if (!isValidEmail(email)) {
            throw new Error('Invalid email address');
        }
        if (!isValidPassword(password)) {
            throw new Error('Invalid password');
        }
        if (password !== passwordRepeat) {
            throw new Error('Passwords do not match');
        }
        return true;
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };
    const onPrivacyPolicyPressed = () => {
        console.warn('onPrivacyPolicyPressed');
    };
    const onHaveAccountPressed = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollViewContent}>
                
                <Text style = {styles.title}>Create an account</Text>

                <CustomInput 
                    placeholder = "Username"
                    value = {username}
                    setValue = {setUsername}
                />

                <CustomInput 
                    placeholder = "Email"
                    value = {email}
                    setValue = {setEmail}
                />

                <CustomInput
                    placeholder = "Password"
                    value = {password}
                    setValue = {setPassword}
                    secureTextEntry
                />

                <CustomInput
                    placeholder = "Repeat Password"
                    value = {passwordRepeat}
                    setValue = {setPasswordRepeat}
                    secureTextEntry
                    width={'80%'}
                />  

                <View>
                    {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
                </View>

                <CustomButton 
                    text = 'Register' 
                    onPress={onRegisterPressed} 
                    type='LIGHT'    
                    width={'80%'}
                    height={50}
                    padding={12}
                    marginVertical={12}
                />

                <Text style = {styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '} 
                     <Text style = {styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>  
                </Text>

                <SocialSignInButtons/>

                <CustomButton 
                    text = "Have an account? Sign In" 
                    onPress={onHaveAccountPressed} 
                    type='TEXT'
                    fontSize={16}
                />  

            </ScrollView>
        </View>
    );
 };

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor:'#051630',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text : {
        textAlign: 'center',
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 20,
    },
    link: {
        color: '#FDB075',
    },
    errorText: {
        color: '#fa5e2a',
        marginHorizontal:40,
        marginBottom:10,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

export default SignUpScreen; 