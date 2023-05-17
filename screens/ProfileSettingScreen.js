import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProfileSettingScreen = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

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