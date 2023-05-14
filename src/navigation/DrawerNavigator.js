import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator({
    ProfileScreen,
    SettingScreen
})

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Profile' component={ProfileScreen}/>
            <Drawer.Screen name='Setting' component={SettingScreen}/>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    drawerItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    drawerItemText: {
        fontSize: 16,
        color: 'black',
    },
});

export default DrawerNavigator;