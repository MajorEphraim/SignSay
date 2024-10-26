import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import logo from '../assets/icon.png'
import { globalStyles } from '../constants/globalStyles'
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'expo-status-bar'

export default function Welcome(){

    const navigation = useNavigation()

    return(
        <>
        <StatusBar style='light' backgroundColor='#37afbf'/>
        <LinearGradient colors={['#75d1dd', '#5e99a7', '#1a7985']} style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:40}}>
                <Text style={{...{color:'white', paddingBottom:10},...globalStyles.heading}}>Welcome to SignSay</Text>
                <Text style={{...{color:'white'},...globalStyles.message}}>Learn, Translate & Communicate in sign language</Text>
                <Image source={logo} style={globalStyles.welcomeLogo}/>
                <Text style={{...{color:'white', fontSize:19, paddingBottom:20},...globalStyles.terms}}>Terms of use</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('mode')} style={{...{borderColor:'white', borderWidth:1, justifyContent:'center', alignItems:'center'},...globalStyles.button}}>
                    <Text style={{...{color:'white'},...globalStyles.buttonText}}>I agree</Text>
                </TouchableOpacity>    
            </View>
        </LinearGradient>
        </>
    )
}