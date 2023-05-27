import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import CustomButton from '../components/CustomButton';

import { themeColors } from '../theme';

const PremiumScreen = () => {
  const navigation = useNavigation();


  return (
    <View showsVerticalScrollIndicator={true} style={styles.container}>
      
      <View style={{ alignItems:'center' }}>

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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: themeColors.bgDark,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.bgLight,
    paddingTop: 20,
  },
  subTitleText: {
    fontSize: 16,
    color: themeColors.bgLight,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  image: {
    top: -56,
    position: 'absolute',
    width:'80%',
    height:130,
  },
  item: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: themeColors.Purple,
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  itemImage: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    padding:5,
    //marginVertical: 8,
    //padding: 10,
    //margin:10,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding:5,
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
});

export default PremiumScreen;