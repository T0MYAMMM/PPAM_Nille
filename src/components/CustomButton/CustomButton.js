import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type="PRIMARY", bgColor, fgColor, width, fontWeight, icon}) => {
    const containerStyle = [
      styles.container,
      styles[`container_${type}`],
      bgColor ? { backgroundColor: bgColor } : {},
      width ? { width: width } : {}  
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
                    fgColor ? { color: fgColor } : {},
                    fontWeight
                ]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        width: 300,
        backgroundColor: '#051630',
        borderRadius: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 5,
        borderWidth:2,
        borderColor: 'white',
        marginVertical:12,
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth:2, 
    },
    
    container_TERTIARY: {

    },

    container_GETSTARTED: {
        width: 200,
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
        color: 'white',
    },

    text_SECONDARY: {
        color: '#FFFFFF',
    },

    text_TERTIARY: {
        color: '#FFFFFF',
    },

    text_GETSTARTED: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#051630',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    
    iconContainer: {

    },
})

export default CustomButton;