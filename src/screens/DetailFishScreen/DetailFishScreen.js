import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { get, ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';

const DetailFishScreen = ({ navigation, route }) => {
    const { fishId } = route.params;
    const [fishData, setFishData] = useState(null);

    useEffect(() => {
        const fishRef = ref(db, 'ornamental_fish_data/');
        onValue(fishRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const fish = Object.values(data).find((item) => item.id_spesies === fishId);
            setFishData(fish);
          }
        });
      }, []);

    const goBack = () => {
        navigation.goBack();
    };

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.measureLayout(
                ScrollView.getScrollView().getInnerViewNode(),
                (x, y) => {
                  ref.current.scrollTo({ y, animated: true });
                }
            );
        }
    };

    const descriptionRef = useRef(null);
    const careRef = useRef(null);
    const characteristicsRef = useRef(null);
    const articlesRef = useRef(null);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fishData ? (
                <View style={styles.content}>
                    <TouchableOpacity style={styles.backButton} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                            <Image 
                                style={styles.image} 
                                source={require('../../../assets/images/arwana.jpg')} 
                                resizeMode="contain" 
                            />
                            <Text style={styles.title}>{fishData.nama_populer}</Text>
                            <Text style={styles.subtitle}>{fishData.nama_lokal}</Text>
                            <Text style={styles.subtitle}>{fishData.nama_ilmiah}</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Ionicons name="construct-outline" size={32} color="#FFC107" />
                            <Text style={styles.cardText}>Temperature: {fishData.temperature}</Text>
                        </View>
                        
                        <View style={styles.card}>
                            <Ionicons name="water-outline" size={32} color="#03A9F4" />
                            <Text style={styles.cardText}>pH Level: {fishData.pHLevel}</Text>
                        </View>

                        <View style={styles.card}>
                            <Ionicons name="timer-outline" size={32} color="#9C27B0" />
                            <Text style={styles.cardText}>Feeding Schedule: {fishData.feedingSchedule}</Text>
                        </View>
                    </View>

                    <Text style={styles.pembatas}> Ini adalah pembatas antara card dan section</Text>

                    <View style={styles.shortcutContainer}>
                    <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <TouchableOpacity
                            style={styles.shortcut}
                            onPress={() => scrollToSection(descriptionRef)}
                            >
                            <Text style={styles.shortcutText}>Description</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.shortcut}
                            onPress={() => scrollToSection(careRef)}
                            >
                            <Text style={styles.shortcutText}>Care</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.shortcut}
                            onPress={() => scrollToSection(characteristicsRef)}
                            >
                            <Text style={styles.shortcutText}>Characteristics</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.shortcut}
                            onPress={() => scrollToSection(articlesRef)}
                            >
                            <Text style={styles.shortcutText}>Articles</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        
                        <ScrollView style={styles.subSection} ref={descriptionRef}>
                            <Text style={styles.sectionText}>{fishData.ciri_umum}</Text>
                            <Text style={styles.sectionText}>{fishData.distribusi_habitat}</Text>
                            <Text style={styles.sectionText}>{fishData.keterangan}</Text>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Care</Text>

                        <ScrollView style={styles.subSection} ref={careRef}>
                            <Text style={styles.sectionText}>{fishData.pemeliharaan}</Text>
                            <Text style={styles.sectionText}>{fishData.reproduksi}</Text>
                            <Text style={styles.sectionText}>{fishData.pakan_larva}</Text>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Characteristics</Text>
                        
                        <ScrollView style={styles.subSection} ref={characteristicsRef}>
                            <Text style={styles.sectionText}>{fishData.pakan_larva}</Text>
                            <Text style={styles.sectionText}>{fishData.reproduksi}</Text>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Articles</Text>   
                        
                        <ScrollView style={styles.subSection} ref={articlesRef}>
                            <Text style={styles.sectionText}>{fishData.reproduksi}</Text>
                        </ScrollView>
                    </View>
                </View>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#051630',
        padding: 16,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        padding: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 16,
    },
    pembatas: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        marginVertical: 20,
    },
    shortcutContainer: {
        flexDirection:'row',
    },
    shortcutText: {
        fontSize: 16,
        color: 'white',
    },
    shortcut: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#0F344C',
        marginHorizontal:5,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontStyle: 'italic',
        color: 'white',
        marginBottom: 8,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        alignItems: 'center',
        padding: 5,
        width: '33%'
    },
    cardText: {
        fontSize: 12,
        color: 'white',
        marginTop: 8,
        padding: 5
    },
    section: {
        flex:1,
        marginBottom: 24,
        width:'100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    subSection: {
        backgroundColor: '#0F344C',
        borderRadius: 8,
        padding: 16,
    },
    sectionText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
      },
  });
    
export default DetailFishScreen;