import React from 'react'
import {View, Text} from 'react-native'
import StackHeader from '../components/StackHeader'

export default function FAQs(){
    return(
        <>
        <StackHeader header={'FAQs'}/>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>FAQs screen</Text>
        </View>
        </>
    )
}