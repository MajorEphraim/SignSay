import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { themes } from '../constants/themes'
import { useSelector } from 'react-redux'

export default function DarkStatusBar(){
    const chosenTheme = useSelector(state=>state.themeState.theme)

    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    return <StatusBar style={chosenTheme === 'dark' ? 'dark':'light'} backgroundColor={theme.statusBar}/>
}