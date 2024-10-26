import React from 'react'
import {View, Text, Modal, TouchableOpacity} from 'react-native'
import { themes } from '../constants/themes'
import { useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RepeatModal({openRepeat,repeatAnimation,stopRecording}) {

    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return (
        <Modal visible={openRepeat} animationType='fade' transparent={true}>
        <View style={{flex:1, flexDirection:'column', paddingHorizontal:'5%', paddingTop:'45%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <View style={{backgroundColor:theme.statusBar, width:'100%', borderRadius:20,paddingHorizontal:'12%', paddingVertical:'5%', flexDirection:'column', alignItems:'center'}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10}}>
                    <TouchableOpacity onPress={repeatAnimation} style={{flexDirection:'column', alignItems:'center'}}>
                        <Ionicons name="repeat" size={30} color={theme.background}  />
                        <Text style={{color:theme.background}}>Repeat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={stopRecording} style={{flexDirection:'column', alignItems:'center'}}>
                        <Ionicons name="close" size={24} color={theme.background}  />
                        <Text style={{color:theme.background}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
    )
}