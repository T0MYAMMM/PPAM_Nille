import * as React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const handleLogout = async () => {
      try {
        // Hapus token autentikasi dari penyimpanan lokal (AsyncStorage)
        const auth = getAuth();
        await signOut(auth);
        await AsyncStorage.removeItem('authToken');
        // Menghapus currentUser atau menetapkannya sebagai null
        //auth.currentUser = null;
  
        // Navigasi ke halaman login
        navigation.navigate('SignIn');
      } catch (error) {
        console.log('Error logging out:', error);
      }
    };

    const onLogoutPressed = () => {
      handleLogout();
    }
      
    return (
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Welcome to Nille</Text>

          <Text style={styles.subTitleText}> Disini ada upcoming to do </Text>

          <CustomButton
            text={"Logout"}
            width={'80%'}
            type='LIGHT'
            padding={12}
            height={50}
            onPress={onLogoutPressed}
          />
        </View>     
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor:'#051630',
    },
    content: {
      alignItems:'center',
      justifyContent:'center',
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center', 
      color: 'white',
      paddingTop:20,
    },
    subTitleText : {
      fontSize: 16, 
      color: 'white', 
      fontWeight: 'normal', 
      textAlign:'center', 
      paddingTop:10, 
      paddingBottom:20,
    },
});

  export default HomeScreen;