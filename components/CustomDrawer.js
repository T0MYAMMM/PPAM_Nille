import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { themeColors } from '../theme';
import { theme } from 'native-base';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: themeColors.bgDark}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.png')}
          style={{padding: 20}}
          
        >
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
        />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'CeraProMedium',
              marginBottom: 5,
            }}>
            John Doe
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'CeraProMedium',
                marginRight: 5,
              }}>
              280 Coins 
            </Text>
            <FontAwesome5 name="coins" size={14} color={themeColors.Pink} />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: themeColors.bgDark, paddingTop: 10}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: themeColors.DarkBlue, backgroundColor:themeColors.bgDark}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} color={themeColors.Pink}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'CeraProMedium',
                marginLeft: 5,
                color: themeColors.Pink,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={themeColors.Pink}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'CeraProMedium',
                marginLeft: 5,
                color: themeColors.Pink,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default CustomDrawer;        