import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { themeColors } from '../theme';

const CustomButton = ({onPress, text, type="DARK", fontSize, bgColor, color, width, height, fontWeight, padding, icon, marginVertical}) => {
    const containerStyle = [
      styles.container,
      styles[`container_${type}`],
      bgColor ? { backgroundColor: bgColor } : {},
      width ? { width: width } : {},
      height ? { height: height } : {},
      padding ? { padding: padding } : {},
      marginVertical ? { marginVertical: marginVertical } : {},  
    ];

    const iconElement = React.isValidElement(icon) ? (
        <View style={{ marginRight: 10 }}>{icon}</View>
      ) : null;
    
    return (
        <Pressable 
            onPress={onPress} 
            style = {containerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {iconElement}
                <Text style={[
                    styles.text,
                    styles[`text_${type}`],
                    color ? { color: color } : {},
                    fontWeight ? { fontWeight: fontWeight } : {},
                    fontSize ? { fontSize: fontSize } : {},
                ]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width:'80%',
        height:50,
        padding: 12,
        marginVertical: 15,
        borderRadius: 75,
    },

    container_LIGHT: {
        backgroundColor: themeColors.bgLight,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
        borderWidth:2,
        borderColor: themeColors.bgDark,
        borderWidth:2,
    },

    container_DARK: {
        backgroundColor: themeColors.bgDark,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
        borderColor: themeColors.bgLight,
        borderWidth:2,
    },

    container_TEXT: {
       
    },
    
    container_WITHICON: {
        width: 600,
        backgroundColor: '#FFFFFF',
        borderRadius: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    text_DARK: {
        color: 'white',
        fontSize: 16,
    },
    text_LIGHT: {
        color: '#051630',
        fontSize: 16,
    },

    text_TEXT: {
        fontWeight:'normal',
        color: 'white',
    },

    iconContainer: {

    },
})

export default CustomButton;