import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Surface, Title } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const IconSize = 24;

const ScreenHeader = ({ menu, onMenuPress, back, title, right, rightFunction, optionalIcon, optionalFunc, navigation, headerBg, iconColor, titleAlign, optionalbadge, titleColor }) => {
  return (
    <Surface style={[styles.header, {backgroundColor:  headerBg}]}>
      <View style={styles.view}>
        {menu && <TouchableOpacity onPress={onMenuPress}>
            <Feather name="menu" size={IconSize} color={iconColor}/>
        </TouchableOpacity>}

        {back && <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={IconSize} color={iconColor}/>
        </TouchableOpacity>}
      </View>

      <View style={styles.titleView}>
        <Title style={[styles.titleText, {color:titleColor},{textAlign: titleAlign}]}>{title}</Title>
      </View>

      <View style={[styles.view, styles.rightView]}>
        {optionalFunc && <TouchableOpacity style={styles.rowView} onPress={optionalFunc}>
            <Feather name={optionalIcon} size={IconSize} color={iconColor}/>
            <Badge style={{position:'absolute', top:-5, right:-10, }}>{optionalbadge}</Badge>
        </TouchableOpacity>}

        {rightFunction && <TouchableOpacity onPress={rightFunction}>
            <Feather name={right} size={IconSize} color={iconColor}/>
        </TouchableOpacity>}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
    header: {
        height:70,
        elevation:4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingTop: 20,
    },
    view: {
        margin:10,
        alignItems:'center',
        flexDirection:'row',
    },
    titleView: { 
        flex:1,
        justifyContent: 'center'
    },
    titleText: 
    {
        fontFamily: 'sans-serif', 
        fontWeight:'bold', 
        fontSize: 20, 
        color: 'white' 
    },
    rightView: {
        justifyContent: 'flex-end',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    
});

export default ScreenHeader;