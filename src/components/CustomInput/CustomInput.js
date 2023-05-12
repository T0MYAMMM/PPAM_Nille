import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, width }) => {
  return (
    <View style={[styles.container, width ? { width: width } : {}]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#6EA9B1',
        borderWidth: 1,
        borderRadius: 75,
        paddingHorizontal: 10,
        marginVertical: 10,
        

        width: '80%',
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
      
    },
    input: {
      textAlignVertical: 'center',
      marginVertical:10,
      marginLeft:10,
    },

});

export default CustomInput;