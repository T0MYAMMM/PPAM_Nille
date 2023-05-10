import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton/CustomButton';

function MyAquariumScreen(){
    const navigation = useNavigation();
    const onLogoutPressed = () => {
      console.warn("Sabar ya fiturnya lagi di develop");
    };

    return (
        <View style={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Add your fish sites</Text>
            <Text style={styles.paragraph}>This is where your growing sites will be listed. You can add sites by tapping the button below.</Text>
            <CustomButton
                text = 'Tombol'
                width = {200}
                onPress={onLogoutPressed} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#051630',
    },
    button: {
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    paragraph: {
      fontSize: 16,
      color: 'white',
      justifyContent: 'center',
      marginHorizontal: 70,
      textAlign: 'center',
      paddingBottom: 20,
    },
  });

export default MyAquariumScreen;
