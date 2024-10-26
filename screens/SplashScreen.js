import React from 'react'
import { View, Text, Image} from 'react-native'
import logo from '../assets/splash_logo.png'
import StatusBar from '../components/DefaultStatusBar'

export default function SplashScreen() {
    return (
        <>
        <StatusBar/>
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#0c4c53'}}>
            <Image
                source={logo}
                style={{height:390, width:390}}
            />
        </View>
        </>
    )
}