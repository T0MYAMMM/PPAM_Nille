import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


function HomeScreen(){
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#FFB6C1', '#87CEFA']} style={styles.container}>
            <Text onPress={() => alert("Udah di Home Screen")}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <View style = {styles.button}>
                <Text style={styles.buttonText}>Settings</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>  
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#29496F',
      fontWeight: 'bold',
    },
  });

export default HomeScreen;