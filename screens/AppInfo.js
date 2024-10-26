import React from 'react'
import {View, Text} from 'react-native'
import StackHeader from '../components/StackHeader'

export default function AppInfo(){
    return(
        <>
        <StackHeader header={'About'}/>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>AppInfo screen</Text>
        </View>
        </>
    )
}