import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Surface, Title } from 'react-native-paper';

import { BellIcon as BellOutline, ArrowLeftIcon } from 'react-native-heroicons/outline';
import { Bars3Icon as Bars3Solid, BellIcon as BellSolid } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';

const IconSize = 30;

const ScreenHeader = ({ menu, onMenuPress, back, title1, title2, opennotif, navigation, headerBg, iconColor, optionalbadge, titleColor }) => {
  return (
    <Surface style={[styles.header, {backgroundColor:  headerBg}]}>

      <View style={styles.container}>

        { menu && <TouchableOpacity style={styles.button} onPress={onMenuPress}>
            <Bars3Solid name="menu" size={22} color={iconColor}/>
        </TouchableOpacity>}

        { back && <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon name="arrow-left" size={IconSize} color={iconColor}/>
        </TouchableOpacity> }

      </View>

      <View style={styles.titleView}>
        
        <Title style={[styles.titleText1, {color:titleColor}]}>{title1}</Title>
        <Title style={[styles.titleText2, {color:titleColor}]}>{title2}</Title>
      
      
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={opennotif}>

            <BellOutline name="bell-notif" size={20} color={iconColor}/>
            
            <Badge style={{position:'absolute', top:-5, right:-5, }}>{optionalbadge}</Badge>
        
        </TouchableOpacity>

      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        elevation:4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    container: {
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:15,
        marginTop:10,
    },
    titleView: { 
        flex:1,
        justifyContent: 'center',
        flexDirection:'column',
        marginLeft:10,
        marginTop:10,
    },
    titleText1: 
    {
        marginBottom:-5,
        textAlign:'left',
        fontSize: 15, 
        color: 'white',
    },
    titleText2: 
    {
        marginTop:-5,
        textAlign:'left',
        fontWeight:'bold', 
        fontSize: 17, 
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: themeColors.DarkBlue,
        borderRadius:15,
    },
    
});

export default ScreenHeader;