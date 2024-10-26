import React from 'react'
import {View, Text, Modal, TouchableOpacity} from 'react-native'
import { themes } from '../constants/themes'
import { useSelector } from 'react-redux'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default  function ConfirmModal({openConfirm,findWords,results,stopRecording}) {

    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return (
        <Modal visible={openConfirm} animationType='fade' transparent={true}>
        <View style={{flex:1, flexDirection:'column', paddingHorizontal:'5%', paddingTop:'45%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <View style={{backgroundColor:theme.statusBar, width:'100%', borderRadius:20,paddingHorizontal:'12%', paddingVertical:'5%', flexDirection:'column', alignItems:'center'}}>
                <View style={{marginBottom:10}}>
                    <FontAwesome name="question-circle" size={28} color={theme.background}  />            
                </View>
                <View style={{backgroundColor:theme.background, borderRadius:10, flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{marginHorizontal:'5%',color:theme.statusBar}}>{results}</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10}}>
                    <TouchableOpacity onPress={findWords} style={{flexDirection:'column', alignItems:'center'}}>
                        <FontAwesome5 name="check" size={30} color={theme.background} />
                        <Text style={{color:theme.background}}>Proceed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={stopRecording} style={{flexDirection:'column', alignItems:'center'}}>
                        <FontAwesome5 name="redo" size={30} color={theme.background} />
                        <Text style={{color:theme.background}}>Redo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
    )
}