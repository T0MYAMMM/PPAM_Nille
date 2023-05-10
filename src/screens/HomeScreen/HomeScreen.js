import * as React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton/CustomButton';
//const LogoImage = require(Logo)

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const onLogoutPressed = () => {
        navigation.navigate('SignIn');
    };
    
    return (
      <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
        <Text style={styles.titleText}>Welcome to Nille</Text>


        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/tuna.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Pothos</Text>
            <Text style={styles.itemPrice}>$14.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/sardines.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Spider plant</Text>
            <Text style={styles.itemPrice}>$10.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/mackerel.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Fiddle leaf fig</Text>
            <Text style={styles.itemPrice}>$24.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/betta.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Peace lily</Text>
            <Text style={styles.itemPrice}>$9.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/clown_fish.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Rubber plant</Text>
            <Text style={styles.itemPrice}>$19.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image source={require('../../../assets/images/koi.jpg')} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemTitle}>Snake plant</Text>
            <Text style={styles.itemPrice}>$12.99</Text>
          </TouchableOpacity>
        </View>
        <View alignItems='center' marginBottom={30} >
          <CustomButton
            type='PRIMARY'
            text='Logout'
            width={250}
            onPress={onLogoutPressed}
          />
        </View>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    contentContainerStyle:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    padding: 20,
    backgroundColor:'#051630',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    color: 'white',
    padding:20,
  },
  logo : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  item: {
    backgroundColor: '#fff',
    width: '31%',
    borderRadius: 10,
    marginBottom: 20,
  },
  itemImage: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginRight: 8,
    marginHorizontal:25,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#051630',
    textAlign:'center',
    paddingBottom:10,
  },
});

export default HomeScreen;