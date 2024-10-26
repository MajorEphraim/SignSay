import React from 'react'
import {View, Text} from 'react-native'
import StackHeader from '../components/StackHeader'

export default function TermsOfUse(){
    return(
        <>
        <StackHeader header={'Term of use'}/>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Terms screen</Text>
        </View>
        </>
    )
}