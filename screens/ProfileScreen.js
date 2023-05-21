import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native';
import { themeColors } from '../theme';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

import CarouselToDo from '../components/carouselToDo';

const { width, height } = Dimensions.get('window');
const cardWidth = 0.8 * width;
const cardHeight = 0.6 * height;

const ProfileScreen = ({ navigation }) => {

    const onEditProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.cancelled) {
          setProfilePicture(result.uri);
        }
    };

    const onEditPressed = () => {
        console.warn("mau edit profile bos?")
    }

    const onSettingPressed = () => {
        console.warn("mau buka setting?")
    }

    const onShopPressed = () => {
        console.warn("mau buka marketplace bos?")
    }

    const onWalletPressed = () => {
        console.warn("mau liat wallet bos?")
    }

    const onLogoutPressed = () => {
        console.warn("mau logout bos?")
    }

    const profile = {
        profilePicture: 'url-to-profile-picture',
        name: 'Thomas Stefen',
        username: '@thomaassm',
        joined: '2 years ago',
        location: 'Location',
        aquariumCount: 5,
    };

    const carouselData = [
        { id: '1', text: 'First item', color: 'lightblue' },
        { id: '2', text: 'Second item', color: 'lightgreen' },
        { id: '3', text: 'Third item', color: 'lightpink' },
      ];
    const [carouselIndex, setCarouselIndex] = useState(0);
    carouselData.push(carouselData[0]);
    carouselData.unshift(carouselData[carouselData.length - 2]);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatlistRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        const nextIndex = viewableItems[0].index;

        // if user reaches the end, scroll back to the first item
        if(nextIndex === carouselData.length - 1) {
            setCarouselIndex(1);
            flatlistRef.current.scrollToIndex({ index: 1, animated: false });
        }
        // if user scrolls back to the first item, scroll to the second to last item
        else if(nextIndex === 0) {
            setCarouselIndex(carouselData.length - 2);
            flatlistRef.current.scrollToIndex({ index: carouselData.length - 2, animated: false });
        }
        else {
            setCarouselIndex(nextIndex);
        }
    }).current;

    const onScrollToIndexFailed = (info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            flatlistRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
      }

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:  50 }).current;

    return (
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container}>

            <TouchableOpacity style={styles.ImageCard} onPress={onEditProfilePicture}>
                <Image 
                    style={styles.image}
                    source={require('../assets/images/avatar.jpg')}
                />
            </TouchableOpacity>

            <View style={styles.profileTextContainer}>
                <Text style={styles.nameText}>{profile.name}</Text>
                <Text style={styles.usernameText}>{profile.username}</Text>
            </View>
            
            <CustomButton 
                text={"Edit Profile"}
                width={154}
                
                type='LIGHT'
                padding={8}
                height={40}
                onPress={onEditPressed}
            />

            <CarouselToDo/>

            
            <TouchableOpacity style={styles.optionContainer} onPress={onSettingPressed}>
                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/setting.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Setting</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={onShopPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.Purple}]} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/shop.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Marketplace</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={onWalletPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.Orange}]}  >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/wallet.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Billing Details</Text>
                </View>

                <TouchableOpacity style={styles.optionButton} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/ok.png')}/>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={onLogoutPressed}>
                <TouchableOpacity style={[styles.optionButton, {backgroundColor: themeColors.LightGreen}]} >
                    <Image 
                    size={22} 
                    source={require('../assets/icons/logout.png')}/>
                </TouchableOpacity>

                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Logout</Text>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: themeColors.bgDark,
        alignItems: 'center',
    },
    ImageCard: {
        width: 130,
        height:130,
        borderRadius:20,
        backgroundColor: themeColors.Purple,
        alignItems:'center',
        justifyContent: 'center'
    },
    image: {
        width:120,
        height:120,
        borderRadius:20,
        resizeMode: "contain"
    },
    CarouselContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    CarouselCard: {
        width: 300,
        height:200,
        borderRadius:20,
        alignItems:'center',
        justifyContent: 'center',
        padding:10,
        margin:10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginVertical: 10,
    },
    optionButton: {
        alignItems: 'center',
        justifyContent:'center',
        width:40,
        height:40,
        backgroundColor: themeColors.Pink,
        borderRadius:15,
        marginLeft:10,
      },
    optionTextContainer: {
        flex: 1, // Here
    },
    optionText: {
        fontSize: 16,
        color: themeColors.bgLight,
        fontFamily:'CeraProMedium',
        marginLeft:25,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileTextContainer:{
        alignItems: 'center',
        marginVertical: 20,
    },
    nameText: {
        textAlign:'center',
        fontSize: 20,
        color: themeColors.bgLight,
        fontFamily:'CeraProBold',
    },
    usernameText: {
        textAlign:'center',
        fontSize: 17,
        color: themeColors.bgLight,
        fontFamily:'CeraProLight',
    },
    joined: {
        fontSize: 16,
        color: '#3C2A21',
    },
    location: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumInfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aquariumLabel: {
        fontSize: 16,
        color: '#3C2A21',
    },
    aquariumCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051630',
    },
});

export default ProfileScreen;