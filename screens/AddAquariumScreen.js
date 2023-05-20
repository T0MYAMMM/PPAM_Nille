import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { themeColors } from '../theme';

const speciesList = [
  { id: 'species1', name: 'Guppy' },
  { id: 'species2', name: 'Betta' },
  // tambahkan sebanyak yang dibutuhkan
];

const AddAquariumScreen = ({ navigation }) => {
  const [speciesId, setSpeciesId] = useState(speciesList[0].id);
  const [size, setSize] = useState('');
  const [cleaningSchedule, setCleaningSchedule] = useState('');
  const [filterType, setFilterType] = useState('');

  const onSubmit = () => {
    // Proses data form di sini, seperti melakukan POST request ke API atau menyimpan ke local storage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Aquarium</Text>
      <Picker
        selectedValue={speciesId}
        style={styles.input}
        onValueChange={(itemValue) => setSpeciesId(itemValue)}
      >
        {speciesList.map((species) => (
          <Picker.Item key={species.id} label={species.name} value={species.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Ukuran"
        onChangeText={text => setSize(text)}
        value={size}
      />
      <TextInput
        style={styles.input}
        placeholder="Jadwal Pembersihan"
        onChangeText={text => setCleaningSchedule(text)}
        value={cleaningSchedule}
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis Filter"
        onChangeText={text => setFilterType(text)}
        value={filterType}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize:24,
    fontWeight: '800',
    marginBottom:10,
    color: themeColors.Blue,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddAquariumScreen;