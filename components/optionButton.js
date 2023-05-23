import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  }
});

export default OptionButton;