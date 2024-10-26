import React from "react"
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { updateModal } from '../redux/actions'

export default function HomeModal(){

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isVisible = useSelector(state=>state.modalState.isVisible)

    return (
        <Modal visible={isVisible} transparent animationType={'none'}>
            <View style={{flex:1}}>
                <View style={{ flexDirection:'row', flex:1}}>
                    <View style={{backgroundColor:'black', flexDirection:'column', justifyContent:'space-around', padding:5}}>
                        <TouchableWithoutFeedback style={{margin:20}} onPress={()=>{navigation.navigate('settings'); dispatch(updateModal(false))}}>
                            <Text style={{color:'#ffff'}}>Settings</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{margin:20, backgroundColor:'yellow'}} onPress={()=>{navigation.navigate('help'); dispatch(updateModal(false))}}>
                            <Text style={{color:'#ffff'}}>Help</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableOpacity activeOpacity={0} style={{flex:1}} onPress={()=>dispatch(updateModal(false))}/>
                             
                </View>
                <TouchableOpacity activeOpacity={0} style={{flex:10}} onPress={()=>dispatch(updateModal(false))}/>
            </View>
        </Modal>
    )
}