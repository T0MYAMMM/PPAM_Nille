import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import sizeIcon from '../assets/icons/size.png';
import locIcon from '../assets/icons/location.png';
import { themeColors } from '../theme';

const FishCard = ({ nama_populer, asal, ukuran, imageUrl, onPress }) => {
  return (
    <View style={styles.root}>
        <TouchableOpacity
        onPress={onPress}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: imageUrl}}
                    resizeMode="contain"
                />

                <View style={styles.text}>
                    <Text style={styles.title}>{nama_populer}</Text>
                        
                    <View style={styles.details}>
                        <Image style={styles.icon} source={locIcon}/>
                        <Text style={styles.description}>{asal}</Text>
                    </View>

                    <View style={styles.details}>
                        <Image style={styles.icon} source={sizeIcon} />
                        <Text style={styles.description}>{ukuran}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        flex:1,
        alignItems: 'center',
    },
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',

        flexDirection: 'row',
        backgroundColor: themeColors.Blue,
        width:"95%",
        borderRadius: 20,
        padding:12,

        marginBottom: 20,
        
    },
    image: {
        width: 95,
        height: 96,
        borderRadius:20,
        resizeMode: 'contain',
    },
    text: {
        flex: 1,
        verticalAlign:'middle',
        marginLeft: 12,
        borderRadius:15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themeColors.bgLight,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:3,
    },
    icon: {
        height: 13,
        
    },
    description: {
        fontSize: 17,
        color: themeColors.bgLight,
        marginLeft: 10,
    }
})

export default FishCard;