import React, { useEffect, useState } from 'react';
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

import { auth, firestoreDb } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ref, set, push } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const CustomDrawer = props => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Hapus token autentikasi dari penyimpanan lokal (AsyncStorage)
      await signOut(auth);
      await AsyncStorage.removeItem('authToken');
      // Menghapus currentUser atau menetapkannya sebagai null
      //auth.currentUser = null;

      // Navigasi ke halaman login
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const onLogoutPressed = () => {
    console.log("Logout dulu")
    handleLogout();
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestoreDb, 'users', user.uid);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data());
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: themeColors.bgDark}}>
        <ImageBackground
          source={require('../assets/images/bg-keren.jpg')}
          style={{padding: 20}}
          
        >
          <Image
            source={user && user.avatar ? { uri: user.avatar } : require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
        />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'CeraProMedium',
              marginBottom: 5,
            }}>
            {user ? user.fname + ' ' + user.lname : 'Guest'}
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
            <FontAwesome5 name="coins" size={14} color={themeColors.bgLight} />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: themeColors.bgDark, paddingTop: 10}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: themeColors.DarkBlue, backgroundColor:themeColors.bgDark}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} color={themeColors.bgLight}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'CeraProMedium',
                marginLeft: 5,
                color: themeColors.bgLight,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogoutPressed} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={themeColors.bgLight}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'CeraProMedium',
                marginLeft: 5,
                color: themeColors.bgLight,
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