import React from 'react'
import { View,Text, Modal, ActivityIndicator } from 'react-native'

export default function ActivityScreen({openActivity}){
    
    return(
    <Modal visible={openActivity} animationType='fade' transparent={true}>
    <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center' ,backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
       <ActivityIndicator size='small' color={'white'}/>
    </View>
    </Modal>
    )
}