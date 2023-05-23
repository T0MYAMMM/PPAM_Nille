import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { themeColors } from '../theme';
import { theme } from 'native-base';
import CarouselAquarium from '../components/carouselAquarium';

const ChooseAquarium = () => {
    const navigation = useNavigation();
    const onLogoutPressed = () => {
      console.warn("Sabar ya fiturnya lagi di develop");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Pilih Aquarium</Text>
            <Text style={styles.subTitleText}>This is where your growing sites will be listed. You can add sites by tapping the button below.</Text>
            
            <View style={styles.carouselContainer}>
              <CarouselAquarium/>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: themeColors.bgDark,
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
  carouselContainer: {
    height: 240, // adjust this value as needed
    marginBottom: 20, // adjust this value as needed
  },
});

export default ChooseAquarium;
