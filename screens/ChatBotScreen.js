import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Logo from '../assets/images/nille_logo.png';

const ChatBotScreen = () => {
    return (
      <View style={styles.container}>
        <Image 
          source={Logo} 
          style={styles.logo} 
          resizeMode='contain'
        />
        <Text style={styles.titleText}>Coming Soon Feature</Text>
        <Text style={styles.descriptionText}>This feature is currently under development and will be available soon. Stay tuned!</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  descriptionText: {
    fontSize: 16,
    textAlign: 'center', 
    color: 'white',
    padding:20,
  },
  logo : {
    width: '120%',
    maxWidth: 300,
    maxHeight: 300,
    marginBottom: 20,
  },
});

export default ChatBotScreen;