import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fishData from '../../../fish_data.js';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const onSearchPressed = () => {
      const filteredResult = fishData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResult(filteredResult);
    };

    const renderSearchResult = ({ item }) => {
      const images = item.image;
      return (
        <TouchableOpacity style={styles.card}>
          <Image
            style={styles.cardImage}
            source={images}
            resizeMode="contain"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.cardDetails}>
              <Ionicons name="ios-pin" size={16} color="#8E8E93" />
              <Text style={styles.cardDetailsText}>{item.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
        {searchResult.length > 0 ? (
          <FlatList
            data={searchResult}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id.toString()}
            style={styles.resultContainer}
            extraData={searchResult}
            virtualizedList={true} // Menambahkan properti virtualizedList
          />
        ) : (
          <View style={styles.emptyResultContainer}>
            <Text style={styles.emptyResultText}>No results found.</Text>
          </View>
        )}
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
    marginTop:15,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 25,
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