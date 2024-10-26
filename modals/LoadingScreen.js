import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import logo from '../assets/icon.png'
import StatusBar from '../components/StatusBar'
import { useSelector } from 'react-redux'
import { themes } from '../constants/themes'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function LoadingScreen({isLoading,errorMsg,stopRecording}) {
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    return (
        <Modal visible={isLoading} animationType='fade' >
            <StatusBar/>
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:theme.text}}>
                {
                    errorMsg != null ? (
                        <>
                            <Text>{errorMsg}</Text>
                            <TouchableOpacity onPress={stopRecording}>
                                <FontAwesome5 name="redo" size={30} color={theme.background} />
                            </TouchableOpacity>
                        </>
                    ):(
                        <>
                            <Image
                                source={logo}
                                style={{height:130, width:130}}
                            />
                            <Text style={{color:'white'}}>...Fetching</Text>
                        </>
                    )
                }
            </View>
        </Modal>

    )
}