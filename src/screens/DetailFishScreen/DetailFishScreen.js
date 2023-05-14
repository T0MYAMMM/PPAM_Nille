import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { get, ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';

const DetailFishScreen = ({ navigation, route }) => {
    const { fishId } = route.params;
    const [fishData, setFishData] = useState(null);
    const scrollA = useRef(new Animated.Value(0)).current;

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
                ref.current.getInnerViewNode(),
                (x, y) => {
                    ref.current.scrollTo({ y: y, animated: true });
                }
            );
        }
    };

    const descriptionRef = useRef(null);
    const careRef = useRef(null);
    const characteristicsRef = useRef(null);
    const articlesRef = useRef(null);

    return (
        <View style={styles.root}>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
            >
                {fishData ? (
                    <View style={styles.content1}>
                        <View style={styles.bannerContainer}>
                            <Animated.Image
                                style={styles.image(scrollA)}
                                source={require('../../../assets/images/arwana.jpg')}
                                resizeMode="contain"
                            />

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{fishData.nama_populer}</Text>
                                <View style={styles.subtitleContainer}>
                                    <Text style={styles.subtitle_ilmiahname}>{fishData.nama_ilmiah}</Text>
                                    {fishData.nama_lokal !== "-" && (
                                        <Text style={styles.subtitle_lokalname}>Ikan {fishData.nama_lokal}</Text>
                                    )}
                                </View>

                            </View>
                        </View>

                        <View style={styles.content2}>
                            <View style={styles.cardContainer}>
                                <View style={styles.card}>
                                    <Ionicons name="thermometer-outline" size={32} color="#051630" />
                                    <Text style={styles.cardText}>Temperature: {fishData.temperature}</Text>
                                    <Text style={styles.cardText}>20°C</Text>
                                </View>

                                <View style={styles.card}>
                                    <Ionicons name="water-outline" size={32} color="#051630" />
                                    <Text style={styles.cardText}>pH Level: {fishData.pHLevel}</Text>
                                    <Text style={styles.cardText}>7.8</Text>
                                </View>

                                <View style={styles.card}>
                                    <Ionicons name="alarm-outline" size={32} color="#051630" />
                                    <Text style={styles.cardText}>Schedule: {fishData.feedingSchedule}</Text>
                                    <Text style={styles.cardText}>08.00 | 20.00</Text>
                                    </View>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.shortcutContainer}>
                                <TouchableOpacity
                                    style={styles.shortcutButton}
                                    onPress={() => scrollToSection(descriptionRef)}
                                >
                                    <Text style={styles.shortcutText}>Description</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.shortcutButton}
                                    onPress={() => scrollToSection(careRef)}
                                >
                                    <Text style={styles.shortcutText}>Care</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.shortcutButton}
                                    onPress={() => scrollToSection(characteristicsRef)}
                                >
                                    <Text style={styles.shortcutText}>Characteristics</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.shortcutButton}
                                    onPress={() => scrollToSection(articlesRef)}
                                >
                                    <Text style={styles.shortcutText}>Articles</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Description</Text>

                                <ScrollView style={styles.subSection} ref={descriptionRef}>
                                    <Text style={styles.sectionText}>{fishData.ciri_umum}</Text>
                                    <Text style={styles.sectionText}>{fishData.distribusi_habitat}</Text>
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
                                <Text style={styles.sectionTitle}>Additional Information</Text>

                                <ScrollView style={styles.subSection} ref={characteristicsRef}>
                                    <Text style={styles.sectionText}>{fishData.keterangan}</Text>
                                    <Text style={styles.sectionText}>{fishData.status}</Text>
                                    <Text style={styles.sectionText}>{fishData.sumber}</Text>
                                </ScrollView>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Articles</Text>

                                <ScrollView style={styles.subSection} ref={articlesRef}>
                                    <Text style={styles.sectionText}>{fishData.reproduksi}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                ) : null}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
    },
    content1: {
        flex: 1,
        alignItems: 'center',
    },
    content2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#051630',
        width: '100%',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 5,
        padding: 8,
    },
    bannerContainer: {
        alignItems: 'center',
        marginTop: -1000,
        paddingTop: 1000,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'black',
    },
    image: scrollA =>  ({
        height: 344,
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-344, 0, 344, 344+1],
                    outputRange: [-344/2, 0, 344*0.5,344*0.5],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-344, 0, 344, 344+1],
                    outputRange: [2,1, 0.75, 0.75],
                }),
            },
        ],
    }),
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(225, 0, 0, 0.0)',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitleContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 8,
    },
    subtitle_lokalname: {
        fontSize: 16,
        fontStyle: 'normal',
        color: 'white',
        marginVertical: 10,
    },
    subtitle_ilmiahname: {
        fontSize: 16,
        fontStyle: 'italic',
        color: 'white',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        alignItems: 'center',
        padding: 10,
        width: '30%',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 8,
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#051630',
    },
    shortcutContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shortcutButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shortcutText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#051630',
    },
    separator: {
        alignSelf: 'stretch',
        borderBottomWidth: 5,
        borderRadius: 5,
        borderBottomColor: 'white',
        marginVertical: 10,
    },
    section: {
        flex: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        marginLeft: 10,
    },
    subSection: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        color: '#051630',
        padding: 5,
        textAlign: 'justify',
    },
});

export default DetailFishScreen;