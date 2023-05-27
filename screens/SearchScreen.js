import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../firebaseConfig.js';
import { onValue, ref } from 'firebase/database';
import CustomButton from '../components/CustomButton.js';
import { MagnifyingGlassIcon as MagnifyingGlassSolid } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import FishCard from '../components/FishCard.js';
import { color } from 'react-native-reanimated';

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

    const onFilterPressed = () => {
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
          <View style={styles.searchcontent}> 
            <View style={styles.searchBar}>
              <MagnifyingGlassSolid size={20} color={themeColors.Red} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search here"
                placeholderStyle={styles.placeholderText}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={onSearchPressed} // Menambahkan onSubmitEditing untuk mengeksekusi fungsi search saat tombol "Enter" ditekan
                returnKeyType="search" // Mengubah text pada tombol "Return" menjadi "Search"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={onFilterPressed} >
                <Image 
                  size={22} 
                  source={require('../assets/icons/filter.png')}/>
            </TouchableOpacity>
          </View> 

        </View> 

        <View style={styles.categorycontainer}>
          <TouchableOpacity>
            <Text style={styles.categoryTitle2}>Freshwater</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.categoryTitle}>Ornamental</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
          <Text style={styles.categoryTitle2}>Predator</Text>  
          </TouchableOpacity>
          
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
  searchcontent:{
    flexDirection: 'row',
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.bgLight,
    borderRadius: 75,
    paddingHorizontal: 10,
    width: '70%',
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 5,
  },
  searchInput: {
    marginLeft: 8,
    color:themeColors.bgDark,
    fontWeight:'bold',
    fontSize: 16,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor: themeColors.Pink,
    borderRadius:15,
    marginLeft:10,
  },
  placeholderText: {
    fontFamily: 'CeraProLight',
    color: 'red',
  },
  categorycontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontFamily: 'CeraProBold',
    color: themeColors.bgLight,
    marginHorizontal:20,
  },
  categoryTitle2: {
    fontSize: 14,
    fontFamily: 'CeraProLight',
    color: themeColors.bgLight,
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