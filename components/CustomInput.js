import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { themeColors } from '../theme';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, width, rightIcon }) => {
  return (
    <View style={[styles.container, width ? { width: width } : {}]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && (
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColors.bgLight,
        borderColor: themeColors.bgDark,
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
    iconContainer: {
      position: 'absolute',
      right: 10,
      justifyContent: 'center',
      height: '100%',
    },

});

export default CustomInput;