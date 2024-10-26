import React from 'react'
import {View, Image} from 'react-native'
import microphone from '../assets/others/microphone.png'
import StatusBar from './StatusBar'
import { useSelector } from 'react-redux'
import HomeModal from '../modals/HomeModal'
import Button from '../components/Button'
import { themes } from '../constants/themes'
import { globalStyles } from '../constants/globalStyles'

export default function MicrophoneComp({startRecording}){
    const isVisible = useSelector(state=>state.modalState.isVisible)

    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return(
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', backgroundColor:theme.background}}>
            <StatusBar/>
            <View style={globalStyles.microphone}>
                <Image source={microphone}/>
            </View>
            <Button name={'Start'} handlePress={startRecording}/>
            <HomeModal isVisible={isVisible}/>
        </View>
    )
}