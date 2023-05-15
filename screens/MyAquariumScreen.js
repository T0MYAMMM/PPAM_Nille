import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';

function MyAquariumScreen(){
    const navigation = useNavigation();
    const onLogoutPressed = () => {
      console.warn("Sabar ya fiturnya lagi di develop");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Add your fish sites</Text>
            <Text style={styles.subTitleText}>This is where your growing sites will be listed. You can add sites by tapping the button below.</Text>
            <CustomButton
                text = 'Tombol'
                onPress={onLogoutPressed} 
                type='LIGHT'
                width='50%'
                height={50}
                padding={12}
                marginVertical={15}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#051630',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 10,
    marginHorizontal: 30, 
  },
});

export default MyAquariumScreen;
