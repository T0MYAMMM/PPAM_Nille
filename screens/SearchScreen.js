import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../firebaseConfig.js';
import { onValue, ref } from 'firebase/database';
import CustomButton from '../components/CustomButton.js';
import { MagnifyingGlassIcon as MagnifyingGlassSolid } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import FishCard from '../components/FishCard.js';

const SearchScreen = ({ navigation }) => {
    const [allData, setAllData] = useState([]);
    const [todoData, setTodoData] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
      const startCountRef = ref(db, 'ornamental_data_fish/');
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        const newPosts = Object.keys(data).map((key) => {
          const { id_spesies, nama_ilmiah, nama_populer, nama_lokal, asal, ciri_umum, ukuran_maksimum, status, kode_area, distribusi_habitat, keterangan, pemeliharaan, reproduksi, pakan_larva, sumber, imageUrl } = data[key];
          return { id_spesies, nama_ilmiah, nama_populer, nama_lokal, asal, ciri_umum, ukuran_maksimum, status, kode_area, distribusi_habitat, keterangan, pemeliharaan, reproduksi, pakan_larva, sumber, imageUrl };
        });
        setAllData(newPosts);
        setTodoData(newPosts);
      });
    }, [])

    const onSearchPressed = () => {
      const filteredResult = allData.filter((item) =>
        item.nama_populer.toLowerCase().includes(query.toLowerCase())
      );
      setTodoData(filteredResult);
    };

    const renderSearchResult = ({ item }) => {
    
      return (
        <FishCard
          nama_populer={item.nama_populer}
          asal={item.asal}
          ukuran={item.ukuran_maksimum}
          imageUrl={item.imageUrl}
          onPress={() => {
            navigation.navigate('DetailFishScreen', { fishId: item.id_spesies })
          }}
        />
      );
    };

    return (
      <View style={styles.container}> 
        <View style={styles.content}>
          <View style={styles.searchBar}>
            <MagnifyingGlassSolid size={30} color={themeColors.bgButton3} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={onSearchPressed} // Menambahkan onSubmitEditing untuk mengeksekusi fungsi search saat tombol "Enter" ditekan
              returnKeyType="search" // Mengubah text pada tombol "Return" menjadi "Search"
            />
          </View>
          <CustomButton  
            onPress={onSearchPressed}
            text='Search'
            type='LIGHT'
            bgColor={themeColors.Red}
            color={themeColors.bgLight}
            width='90%'
            height={50}
            padding={12}
            marginVertical={10}
          />  
        </View> 
        <View style={styles.content2}>
          {todoData.length > 0 ? (
            <FlatList
              data={todoData}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id_spesies}
              style={styles.resultContainer}
              extraData={todoData}
              virtualizedList={true} // Menambahkan properti virtualizedList
            />
          ) : (
            <View style={{padding:10}}>
              <Text style={{color: themeColors.bgLight, fontWeight:'bold', fontSize:16}}>No results found.</Text> 
            </View>
          )}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor:themeColors.bgDark,
  },
  content: {
    width:'100%',
    alignItems:'center',
    
  },
  content2: {
    flex:1,
    width:'100%',
    alignItems:'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.bgLight,
    borderRadius: 75,
    paddingHorizontal: 10,
    width: '90%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 5,
    marginTop: 15,

  },
  searchInput: {
    marginLeft: 8,
    color:themeColors.bgDark,
    fontWeight:'bold',
    fontSize: 16,
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    contentContainerStyle:{alignItems:'center'},

    width:"100%",
    
    paddingHorizontal:20,
    marginVertical: 15,
    
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.bgButton,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical:5,
    marginBottom: 15,
    width:"100%",
  },
  cardImage: {
    width: '40%',
    height: 100,
    borderRadius:20,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.bgLight,
    marginBottom: 2,
    marginTop:15,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 25,
    borderRadius:15,
  },
  cardDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardDetailsText: {
    fontSize: 16,
    color: themeColors.bgLight,
    marginLeft: 4,
  },
});

export default SearchScreen;