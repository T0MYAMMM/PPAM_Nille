import * as React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton/CustomButton';
//const LogoImage = require(Logo)

const HomeScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    
    return (
      <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
        <Text style={styles.titleText}>Welcome to Nille</Text>

        <Text style={styles.subTitleText}> Disini ada upcoming to do </Text>

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