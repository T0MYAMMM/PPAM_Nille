import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { themeColors } from '../theme';

const ToDo = ({ item }) => {
    const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>

        

        <TouchableOpacity
            style={styles.box}
        >
            <Text style={styles.time}> {item.time} </Text>
            <Text style={styles.task}> {item.task} </Text>
        </TouchableOpacity>

        <View style={{ flex: 0.3 }}>
            <Text style={styles.time}> {item.time} </Text>
            <Text style={styles.task}> {item.task} </Text>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    time: {
        fontSize:20,
        fontWeight: '800',
        marginBottom:10,
        color: themeColors.bgLight,
        textAlign: 'center'
    },
    task: {
        fontSize:17,
        marginBottom:10,
        color: themeColors.bgLight,
        textAlign: 'center'
    },
    box: {
        flexDirection:'row',
        flex: 0.7,
        width: 700,
        height: 500,
        borderRadius: 20,
        backgroundColor: themeColors.Pink,
        justifyContent: 'center'
    },

});

export default ToDo;