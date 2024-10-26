import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { themes } from '../constants/themes'
import { globalStyles } from '../constants/globalStyles'
import { useSelector } from 'react-redux'

export default function Button({name, handlePress}){
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return(
        <TouchableOpacity onPress={handlePress} style={{...{borderColor:theme.text, borderWidth:1, justifyContent:'center', alignItems:'center'},...globalStyles.button}}>
             <Text style={{...{color:theme.text},...globalStyles.buttonText}}>{name}</Text>
         </TouchableOpacity>
    )   
}