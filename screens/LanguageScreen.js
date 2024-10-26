import React from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../constants/globalStyles'
import LinearGradient from 'react-native-linear-gradient'

export default function Language(){
    const navigation = useNavigation()

    return(
        <LinearGradient colors={['#75d1dd', '#5e99a7', '#1a7985']} style={{flex:1, backgroundColor:'blue'}}>
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
                <Text style={globalStyles.chooseHeading}>Select</Text>
                <TextInput/>
                <TouchableOpacity onPress={()=>navigation.navigate('mode')}>
                    <Text>Done</Text>
                </TouchableOpacity>
            </View> 
       </LinearGradient>
    )
}