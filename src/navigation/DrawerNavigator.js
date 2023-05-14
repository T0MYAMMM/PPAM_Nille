import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator();

const ToProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('ProfileScreen')}
        title="Go to profile"
      />
    </View>
  );
};

const ToSettingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('SettingScreen')}
        title="Go to settings"
      />
    </View>
  );
};

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Profile" component={ToProfileScreen} />
        <Drawer.Screen name="Setting" component={ToSettingScreen} />
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