import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function DetailsScreen(){
    const navigation = useNavigation();
    return (
        <LinearGradient colors={['#020109', '#051630']} style={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Details Screen</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      color: '#6EA9B1',
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
    titleText: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'BebasNeuePro-Bold',
      color: '#D1BDC6',
    },
  });

export default DetailsScreen;
