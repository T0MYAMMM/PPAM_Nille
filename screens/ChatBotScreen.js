import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { themeColors } from '../theme';
import { firestoreDb } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ChatBotScreen = () => {
  const [data, setData] = useState([]);
  const [apiKey, setApiKey] = useState(null);
  //const apiKey = Api_ChatBot;
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestoreDb, 'App_Creds', 'API');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setApiKey(docSnap.data().API_Chatbot);
        //console.log(apiKey);
      } else {
        console.log("No such document!");
      }
    };
  
    fetchData();
  }, []);

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
    setTextInput('');
  };

  return (
    <View style={styles.container}>
        <View style={styles.chatContainer}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.chat}
                contentContainerStyle={styles.chatContent}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.type === 'user' ? styles.userMessage : styles.botMessage]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={textInput}
                    onChangeText={(text) => setTextInput(text)}
                    placeholder="Ask me anything"
                    
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-end',
    padding: 16,
    
    
  },
  chat: {
    flex: 1,
    backgroundColor: themeColors.LightGreen,
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius:20,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  message: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: themeColors.bgDark,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: themeColors.DarkBlue,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: themeColors.bgLight,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    color:themeColors.bgLight, 
    borderColor: themeColors.Red,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: themeColors.Red,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.bgLight,
  },
});

export default ChatBotScreen;