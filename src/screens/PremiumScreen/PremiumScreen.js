import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function PremiumScreen(){
    const navigation = useNavigation();
    return (
      <LinearGradient colors={['#D7EEF1', '#D7EEF1']} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.titleText}>Premium Screen
            </Text>
        </ScrollView>
      </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051630',
        padding:20,
      },
  });

export default PremiumScreen;
