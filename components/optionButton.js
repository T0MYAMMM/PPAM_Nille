import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { themeColors } from '../theme';
import { theme } from 'native-base';
const optionwidth = 0.3*330;


const OptionButton = ({ options, title, selectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const onPressOption = (option) => {
    setSelectedOption(option);
    selectOption(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.option, selectedOption === option && styles.selectedOption]}
            onPress={() => onPressOption(option)}
          >
            <Text style={[styles.optionText, selectedOption === option && styles.selectedText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily:'CeraProBold',
    marginBottom: 10,
    color: themeColors.bgDark,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionsContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width:330,
    backgroundColor: 'red',
  },
  option: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: themeColors.bgLight,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  
  selectedOption: {
    backgroundColor: themeColors.bgDark,
    borderColor: themeColors.bgLight,
    elevation:55,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontFamily:'CeraProBold',
    color: themeColors.bgDark,
  },
  selectedText: {
    color: themeColors.bgLight,
  },
});

export default OptionButton;