import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { themes } from '../constants/themes'
import { useSelector } from 'react-redux'

export default function StackHeader({header}){
    const navigation = useNavigation()

    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return(
        <View style={{backgroundColor:theme.background, width:'100%', height:100, flexDirection:'row', alignItems:'center', padding:'2%', paddingTop:'4%'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:'2%'}}>
                 <AntDesign name="arrowleft" size={30} color={theme.text} />
            </TouchableOpacity>
            <Text style={{color:theme.text, fontSize:20}}>{header}</Text>
        </View>
    )
}