import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
    //const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const onSearchPressed = () => {
      const filteredResult = [
        { id: 1, name: "Tuna", location: "Laut", image: require("../../../assets/tuna.jpg") },
        { id: 2, name: "Salmon", location: "Laut", image: require("../../../assets/salmon.jpg") },
        { id: 3, name: "Sardines", location: "Laut", image: require("../../../assets/sardines.jpg") },
        { id: 4, name: "Cod", location: "Laut", image: require("../../../assets/cod.jpg") },
        { id: 5, name: "Mackerel", location: "Laut", image: require("../../../assets/mackerel.jpg") },
        { id: 6, name: "Rainbow Shark", location: "Asia", image: require("../../../assets/rainbow_shark.jpg") },
        { id: 7, name: "Discus", location: "Amazon", image: require("../../../assets/discus.jpg") },
        { id: 8, name:" Betta Fish", location: "Asia", image: require("../../../assets/betta_fish.jpg") },
        { id: 9, name: "Goldfish", location: "Asia", image: require("../../../assets/goldfish.jpg") },
        { id: 10, name: "Angelfish", location: "Amazon", image: require("../../../assets/angelfish.jpg") },
        { id: 11, name: "Guppy", location: "South America", image: require("../../../assets/guppy.jpg") },
        { id: 12, name: "Koi", location: "Asia", image: require("../../../assets/koi.jpg") },
        { id: 13, name: "Molly", location: "Central America", image: require("../../../assets/molly.jpg") },
        { id: 14, name: "Neon Tetra", location: "South America", image: require("../../../assets/neon_tetra.jpg") },
        { id: 15, name: "Platy", location: "Central America", image: require("../../../assets/platy.jpg") },
        { id: 16, name: "Swordtail", location: "Mexico", image: require("../../../assets/swordtail.jpg") },
        { id: 17, name: "Tiger Barb", location: "Indonesia", image: require("../../../assets/tiger_barb.jpg") },
        { id: 18, name: "Pleco", location: "South America", image: require("../../../assets/pleco.jpg") },
        { id: 19, name: "Corydoras Catfish", location: "South America", image: require("../../../assets/corydoras_catfish.jpg") },
        { id: 20, name: "Amano Shrimp", location: "Japan", image: require("../../../assets/amano_shrimp.jpg") },
        { id: 21, name: "Snail", location: "Worldwide", image: require("../../../assets/snail.jpg") },
        { id: 22, name: "Red Cherry Shrimp", location: "Taiwan", image: require("../../../assets/red_cherry_shrimp.jpg") },
        { id: 23, name: "Blue Ram", location: "South America", image: require("../../../assets/blue_ram.jpg") },
        { id: 24, name: "Electric Yellow Cichlid", location: "Africa", image: require("../../../assets/electric_yellow_cichlid.jpg") },
        { id: 25, name: "Lampam", location: "Tawar", image: require("../../../assets/lampam.jpg") },
        { id: 26, name: "Gurame", location: "Tawar", image: require("../../../assets/gurame.jpg") },
        { id: 27, name: "Pearl Gourami", location: "Asia Tenggara", image: require("../../../assets/pearl_gourami.jpg") },
        { id: 28, name: "Cupang", location: "Tawar", image: require("../../../assets/cupang.jpg") },
        { id: 29, name: "Arwana", location: "Tawar", image: require("../../../assets/arwana.jpg") },
        { id: 30, name: "Botia", location: "Tawar", image: require("../../../assets/botia.jpg") },
        { id: 31, name: "Koki", location: "Tawar", image: require("../../../assets/koki.jpg") },
        { id: 32, name: "Clown Fish", location: "Laut", image: require("../../../assets/clown_fish.jpg") },
        { id: 33, name: "Kakap", location: "Laut", image: require("../../../assets/kakap.jpg") },
        { id: 34, name: "Teri", location: "Laut", image: require("../../../assets/teri.jpg") },
        { id: 35, name: "Gabus", location: "Tawar", image: require("../../../assets/gabus.jpg") },
        { id: 36, name: "Belut", location: "Tawar", image: require("../../../assets/belut.jpg") },
        { id: 37, name: "Piranha", location: "Tawar", image: require("../../../assets/piranha.jpg") },
        { id: 38, name: "Betta", location: "Tawar", image: require("../../../assets/betta.jpg") },
        { id: 39, name: "Kissing Gourami", location: "Asia Tenggara", image: require("../../../assets/kissing_gourami.jpg") },
        { id: 41, name: "Bristlenose Pleco", location: "Amazon", image: require("../../../assets/bristlenose_pleco.jpg") },
        { id: 42, name: "Giant Danio", location: "Asia Tenggara", image: require("../../../assets/giant_danio.jpg") },
        { id: 43, name: "Harlequin Rasbora", location: "Asia Tenggara", image: require("../../../assets/harlequin_rasbora.jpg") },
        { id: 44, name: "Electric Eel", location: "Amazon", image: require("../../../assets/electric_eel.jpg") },
        { id: 45, name: "Black Ghost Knifefish", location: "Amazon", image: require("../../../assets/black_ghost_knifefish.jpg") }
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