import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Keyboard } from 'react-native';
import { writeAsStringAsync } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import Ikan from './Ikan.js';
import { useNavigation } from '@react-navigation/native';

const AddFishScreen = () => {
    const [idSpesies, setIdSpesies] = useState('');
    const [namaIlmiah, setNamaIlmiah] = useState('');
    const [namaPopuler, setNamaPopuler] = useState('');
    const [namaLokal, setNamaLokal] = useState('');
    const [asal, setAsal] = useState('');
    const [ciriUmum, setCiriUmum] = useState('');
    const [ukuranMaksimum, setUkuranMaksimum] = useState('');
    const [status, setStatus] = useState('');
    const [kodeArea, setKodeArea] = useState('');
    const [distribusiHabitat, setDistribusiHabitat] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [pemeliharaan, setPemeliharaan] = useState('');
    const [reproduksi, setReproduksi] = useState('');
    const [pakanLarva, setPakanLarva] = useState('');
    const [sumber, setSumber] = useState('');
    const [textInputFocused, setTextInputFocused] = useState('');

    const handleSave = async () => {
      try {
        const ikan = new Ikan();
        ikan.id_spesies = idSpesies;
        ikan.nama_ilmiah = namaIlmiah;
        ikan.nama_populer = namaPopuler;
        ikan.nama_lokal = namaLokal;
        ikan.asal = asal;
        ikan.ciri_umum = ciriUmum;
        ikan.ukuran_maksimum = ukuranMaksimum;
        ikan.status = status;
        ikan.kode_area = kodeArea;
        ikan.distribusi_habitat = distribusiHabitat;
        ikan.keterangan = keterangan;
        ikan.pemeliharaan = pemeliharaan;
        ikan.reproduksi = reproduksi;
        ikan.pakan_larva = pakanLarva;
        ikan.sumber = sumber;
  
        const jsonData = JSON.stringify(ikan, null, 2);
        
        const filePath = '/ikan.json';

        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + filePath, jsonData, { encoding: 'utf8' }); 
        console.log('Data ikan berhasil disimpan.');

        setIdSpesies('');
        setNamaIlmiah('');
        setNamaPopuler('');
        setNamaLokal('');
        setAsal('');
        setCiriUmum('');
        setUkuranMaksimum('');
        setStatus('');
        setKodeArea('');
        setDistribusiHabitat('');
        setKeterangan('');
        setPemeliharaan('');
        setReproduksi('');
        setPakanLarva('');
        setSumber('');

      } catch (error) {
        console.error('Terjadi kesalahan saat menyimpan data ikan:', error);
      }
    };
  
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.root}>
          <Text style={styles.title}>Tambah Data Ikan</Text>
  
          <TextInput
            style={styles.input}
            placeholder="ID Spesies"
            value={idSpesies}
            onChangeText={setIdSpesies}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Nama Ilmiah"
            value={namaIlmiah}
            onChangeText={setNamaIlmiah}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Nama Populer"
            value={namaPopuler}
            onChangeText={setNamaPopuler}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Nama Lokal"
            value={namaLokal}
            onChangeText={setNamaLokal}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Asal"
            value={asal}
            onChangeText={setAsal}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Ciri Umum"
            value={ciriUmum}
            onChangeText={setCiriUmum}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Ukuran Maksimum"
            value={ukuranMaksimum}
            onChangeText={setUkuranMaksimum}
          />

          <TextInput
            style={styles.input}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />

          <TextInput
            style={styles.input}
            placeholder="Kode Area"
            value={kodeArea}
            onChangeText={setKodeArea}
          />

          <TextInput
            style={styles.input}
            placeholder="Distribusi/Habitat"
            value={distribusiHabitat}
            onChangeText={setDistribusiHabitat}
          />

          <TextInput
            style={styles.input}
            placeholder="Keterangan"
            value={keterangan}
            onChangeText={setKeterangan}
          />

          <TextInput
            style={styles.input}
            placeholder="Pemeliharaan"
            value={pemeliharaan}
            onChangeText={setPemeliharaan}
          />

          <TextInput
            style={styles.input}
            placeholder="Reproduksi"
            value={reproduksi}
            onChangeText={setReproduksi}
          />

          <TextInput
            style={styles.input}
            placeholder="Pakan Larva"
            value={pakanLarva}
            onChangeText={setPakanLarva}
          />

          <TextInput
            style={styles.input}
            placeholder="Sumber"
            value={sumber}
            onChangeText={setSumber}
          />

          <Button title="Simpan" onPress={handleSave} />
        </View>
      </ScrollView>
  );
 };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#051630',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddFishScreen;
