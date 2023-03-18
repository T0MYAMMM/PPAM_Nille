import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function SearchScreen(){
    const navigation = useNavigation();
    return (
        <LinearGradient colors={['#D7EEF1', '#D7EEF1']} style={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Search Screen</Text>
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
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#051630',
    },
  });

export default SearchScreen;
