import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { themeColors } from '../theme';

const ProfileScreen = ({ navigation }) => {
    const profile = {
        profilePicture: 'url-to-profile-picture',
        name: 'User Name',
        joined: '2 years ago',
        location: 'Location',
        aquariumCount: 5,
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Image style={styles.profilePicture} source={{ uri: profile.profilePicture }} />
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.joined}>{profile.joined}</Text>
                <Text style={styles.location}>{profile.location}</Text>
            </View>

            <Button title="To Do" onPress={() => navigation.navigate('home')} color="#29496F" />

            <View style={styles.aquariumInfo}>
                <Text style={styles.aquariumLabel}>Aquariums:</Text>
                <Text style={styles.aquariumCount}>{profile.aquariumCount}</Text>
                <Button title="My Aquarium" onPress={() => navigation.navigate('aquarium')} color="#32918C" />
            </View>

            <Button title="Settings" onPress={() => navigation.navigate('ProfileSetting')} color="#4E8FF8" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#DCF6F4',
    },
    profileInfo: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051630',
    },
    joined: {
        fontSize: 16,
        color: '#3C2A21',
    },
    location: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumInfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aquariumLabel: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051630',
    },
});

export default ProfileScreen;