import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
    //const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const onSearchPressed = () => {
      const filteredResult = [
        { id: 1, name: 'Tuna', location: 'Laut', image: require('../../../assets/tuna.jpg') },
        { id: 2, name: 'Salmon', location: 'Laut', image: require('../../../assets/salmon.jpg') },
        { id: 3, name: 'Sardines', location: 'Laut', image: require('../../../assets/sardines.jpg') },
        { id: 4, name: 'Cod', location: 'Laut', image: require('../../../assets/cod.jpg') },
        { id: 5, name: 'Mackerel', location: 'Laut', image: require('../../../assets/mackerel.jpg') },
      ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      
      setSearchResult(filteredResult);
    };  
    const renderSearchResult = ({ item }) => {
      return (
        <TouchableOpacity style={styles.card}>
          <Image
            style={styles.cardImage}
            source={item.image}
            resizeMode="contain"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <CardDetails location={item.location} />
          </View>
        </TouchableOpacity>
      );
    };
    const CardDetails = ({ location }) => {
      return (
        <View style={styles.cardDetails}>
          <Ionicons name="ios-pin" size={16} color="#8E8E93" />
          <Text style={styles.cardDetailsText}>{location}</Text>
        </View>
      );
    };  

    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Ionicons name="ios-search" size={24} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSearchPressed} // Menambahkan onSubmitEditing untuk mengeksekusi fungsi search saat tombol "Enter" ditekan
            returnKeyType="search" // Mengubah text pada tombol "Return" menjadi "Search"
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={onSearchPressed}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <FlatList
          data={searchResult}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id.toString()}
          style={styles.resultContainer}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
  searchButton: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  cardImage: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetailsText: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 4,
  },
});

export default SearchScreen;