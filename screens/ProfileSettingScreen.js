import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { themeColors } from '../theme';

const ProfileSettingScreen = () => {
    const {user, logout} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const getUser = async() => {
        const currentUser = await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        })
    }

    const handleUpdate = async() => {
        let imgUrl = await uploadImage();
    
        if( imgUrl == null && userData.userImg ) {
          imgUrl = userData.userImg;
        }
    
        firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          fname: userData.fname,
          lname: userData.lname,
          about: userData.about,
          phone: userData.phone,
          country: userData.country,
          city: userData.city,
          userImg: imgUrl,
        })
        .then(() => {
          console.log('User Updated!');
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
          );
        })
    }

    const fetchUserData = async () => {
        const userDocument = await firestore().collection('users').doc('userId').get();
        const userData = userDocument.data();
        setName(userData.name);
        setLocation(userData.location);
    }

    const saveUserData = async () => {
        await firestore().collection('users').doc('userId').update({
            name: name,
            location: location,
        });
    }

    useEffect(() => {fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Text style={styles.label}>Location:</Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={(text) => setLocation(text)}
            />
            <Button title="Save" onPress={saveUserData} color="#32918C" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF7D6',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#3C2A21',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        borderColor: '#29496F',
        backgroundColor: '#DCF6F4',
    },
});

export default ProfileSettingScreen;