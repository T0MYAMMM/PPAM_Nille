import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { themeColors } from '../theme';
import { theme } from 'native-base';
import CarouselAquarium from '../components/carouselAquarium';
import { useRoute } from '@react-navigation/native';

//import CoffeeCard from '../components/coffeeCard';


const MyAquariumScreen = () => {
    const route = useRoute();
    const formData = route.params?.formData || {};

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
            
            <View style={styles.carouselContainer}>
              <CarouselAquarium/>
            </View>

            <Text style={[styles.subTitleText, {top:-15,}]}>{")* Swipe left for add new aquarium"}</Text>


          <View style={{ alignItems:'center', marginTop:50, }}>

            <TouchableOpacity style={styles.premiumCard}>
              <Image
                source={require("../assets/images/nille_logo.png")}
                style={styles.image}
                resizeMode='contain'
              />

              <Text style={styles.promoTitle}>Nille Premium</Text>

              <Text style={styles.promoText}>Subscribe to use our complete features!</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: themeColors.bgDark,
  },
  titleText: {
    fontSize: 24,
    fontFamily:'CeraProBold',
    textAlign: 'center', 
    color: themeColors.bgLight,
    paddingTop:20,
  },
  subTitleText : {
    fontSize: 16, 
    color: themeColors.bgLight, 
    fontFamily:'CeraProLight',
    textAlign:'center', 
    paddingTop:10, 
    paddingBottom:20,
    marginHorizontal:20,
  },
  carouselContainer: {
    height: 240, // adjust this value as needed
    marginBottom: 5, // adjust this value as needed
  },
  premiumCard: {
    width:'90%',
    height:200,
    backgroundColor: themeColors.Green,
    alignItems:'center',
    borderRadius:20,
  },
  promoTitle: {
    marginTop:65,
    fontSize: 24,
    fontFamily:'CeraProBold',
    textAlign: 'center', 
    color: themeColors.bgDark,
    paddingTop:20,
  },
  promoText: {
    fontSize: 16, 
    color: themeColors.bgDark, 
    fontFamily:'CeraProMedium',
    lineHeight:20,
    textAlign:'center', 
    paddingTop:10, 
    paddingBottom:20,
    marginHorizontal:20,
  },
  image: {
    top: -56,
    position: 'absolute',
    width:'80%',
    height:130,
  },
});

export default MyAquariumScreen;
