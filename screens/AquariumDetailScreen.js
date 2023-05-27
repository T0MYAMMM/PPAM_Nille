import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import ImageUploadContext from './ImageUploadContext';
import { themeColors } from '../theme';

import CarouselToDo from '../components/carouselToDo';
import CustomButton from '../components/CustomButton';

const speciesList = [
  { id: 'species1', name: 'Guppy' },
  { id: 'species2', name: 'Betta' },
  // tambahkan sebanyak yang dibutuhkan
];

const aquariumData = [
  {
    name: "akuarium a",
    size: "medium",
    water: "fresh",
    email: "samoht.nefets@gmail.com",
    accessories: "Yes",
    fish : {
      asal: "Papua",
      ciri_umum: "Ikan jantan secara keseluruhan berwarna kehijauan dengan refleksi keperakan pada bagian sisi punggung dan kepala. Pada bagian dorsal terdapat garis-garis warna yang terbentuk oleh susunan sisik berwarna hijau-kuning, sedangkan pada bagian ventral membentuk strip-strip biru bergantian dengan jingga, sirip berwarna transkulen kehijauan. Jantan berbentuk pipih dan memiliki pemanjangan tulang posterior.",
      distribusi_habitat: "Wilayah Sungai Grime khususnya di Danau Nenggwambu (Danau Kali Biru), sekitar 50 km sebelah barat Danau Sentani. Tahun 2008 ditemukan pula di Danau Jaigum.",
      id_spesies: "ab01",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/nille-14a1f.appspot.com/o/ornamental_fish_images%2FDority%E2%80%99s%20Rainbowfish.jpg?alt=media&token=a0a162eb-2635-4448-837f-d46ffcd95431",
      keterangan: "Berkelompok",
      kode_area: "1",
      nama_ilmiah : "Glossolepis dorityi Allen, 2001",
      nama_lokal : "-",
      nama_populer : "Dority’s Rainbowfish",
      pakan_larva : "Plankton, insekta air.",
      pemeliharaan : "Sifatnya berkelompok dan pendamai, dapat dipelihara bersama ikan rainbow lainnya. Bersifat omnivora (pemakan segala).",
      reproduksi: "Hampir sama dengan ikan rainbow lainnya. Pemijahan berlangsung pada akar tanaman air atau substrat. Substrat yang tertempeli telur dipisahkan dari induknya.",
      status : "Asli. Kategori IUCN Red List Status Not Evaluated (Ref. 96402). Pertama kali ditemukan tahun 2000 dan ditemukan kembali oleh peneliti yang sama pada tahun 2008. Namanya diambil dari seorang yang telah berupaya mengoleksi spesies ini, yaitu Dan Dority. Kondisi terancam punah punah, diduga akibat dari introduksi ikan gabus (Channa striata) dan ikan mas (Cyprinus carpio).",
      sumber : "Tappin, 2010",
      ukuran_maksimum: "Betina 8 cm, Jantan 10 cm"
    },
    reminder: {
      foodType: "palet",
      times: "1",
      time: {
        0:"2023-05-25T06:59:41.842Z"
      }
    }
  }
]

const AquariumDetailScreen = ({ navigation }) => {
  const [speciesId, setSpeciesId] = useState(speciesList[0].id);
  const [size, setSize] = useState('');
  const [cleaningSchedule, setCleaningSchedule] = useState('');
  const [filterType, setFilterType] = useState('');


  //kebutuhan upload image
  const [fishData, setFishData] = useState([]);
  const handleImageUpload = useContext(ImageUploadContext);
  const listAllImages = async () => {
    const storageRef = ref(storage, 'uploaded_images/');
    try {
      const result = await listAll(storageRef);
      const url = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(ref(storage, item.fullPath));
          return url;
        })
      );
      setFishData(url);
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadImagePressed = () => {
    navigation.navigate('UploadImageScreen', {
      handleImageUpload });
  };

  useFocusEffect(() => {
    listAllImages();
  });
  //kebutuhan upload image!!!


  const onSubmit = () => {
    // Proses data form di sini, seperti melakukan POST request ke API atau menyimpan ke local storage
  };

  const onLogoutPressed = () => {
    console.warn("Sabar ya fiturnya lagi di develop");
  };

  return (
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>
        

        <View style={styles.content}>
                
            <Text style={styles.titleText}>Data Aquarium</Text>

            <Text style={styles.subTitleText}> Disini ada list data aquarium </Text>

            <View style={styles.carouselContainer}>
                <CarouselToDo/>
            </View>

            <Text style={styles.subTitleText}> Disini nanti ada upload images </Text>

            <Text style={styles.titleText}>Aquarium Gallery</Text>

            <Text style={styles.subTitleText}> 
                Jika ingin menambahkan data card, silakan upload gambar dengan menekan tombol di bawah 
            </Text>

            <View alignItems="center" marginBottom={30}>
                <CustomButton 
                type="LIGHT" 
                text="Upload Image" 
                width={250} 
                onPress={onUploadImagePressed} 
                marginVertical={5}
                />
            </View>
            
            <View style={styles.itemsContainer}>
                {fishData.map((url, index) => (
                <TouchableOpacity key={index} style={styles.item}>
                    <Image source={{ uri: url }} style={styles.itemImage} resizeMode="contain" />
                    <Text style={styles.itemTitle}>File {index + 1}</Text>
                </TouchableOpacity>
                ))}
            </View>
        </View>     
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
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
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: themeColors.bgDark,
  },
  content: {
    alignItems:'center',
    justifyContent:'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    color: themeColors.bgLight,
    paddingTop:20,
  },
  subTitleText : {
    fontSize: 16, 
    color: themeColors.bgLight, 
    fontWeight: 'normal', 
    textAlign:'center', 
    paddingTop:10, 
    paddingBottom:20,
  },
  carouselContainer: {
    height: 240, // adjust this value as needed
    marginBottom: 20, // adjust this value as needed
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  item: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: themeColors.Purple,
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  itemImage: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    padding:5,
    //marginVertical: 8,
    //padding: 10,
    //margin:10,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding:5,
  },
});

export default AquariumDetailScreen;