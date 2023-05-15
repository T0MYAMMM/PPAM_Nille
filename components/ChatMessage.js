import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatMessage = ({ message, isUser }) => {
  const containerStyle = isUser ? [styles.container, styles.userContainer] : styles.container;
  const textStyle = isUser ? [styles.text, styles.userText] : styles.text;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  userText: {
    color: 'white',
  },
});

export default ChatMessage;