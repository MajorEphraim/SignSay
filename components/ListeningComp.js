import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { themes } from '../constants/themes'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'

export default function ListeningComp({}){
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    const [show, setShow] = useState(4)
    
    useEffect(()=>{
        let mounted = true
        let i =1
        const startListening = ()=>{
            if (mounted) {
                setShow(i)
                i == 4 ? i=1 : i++
                setTimeout(()=>startListening(),1000)
            }
        }
        
        startListening()
        return ()=>{
            mounted = false
        }
    },[])

    return(
    <View style={{flex:1, flexDirection:'column',alignItems:'center', backgroundColor:theme.background, padding:15}}>
            <View style={{borderWidth:1, borderColor:show >= 4 ? theme.statusBar:theme.background, borderRadius:100, margin:15,justifyContent:'center', alignItems:'center'}}>
                <View style={{borderWidth:1, borderColor:show >= 3 ? theme.statusBar:theme.background, borderRadius:100, margin:15, justifyContent:'center', alignItems:'center'}}>
                    <View style={{borderWidth:1, borderColor:show >= 2 ? theme.statusBar:theme.background, borderRadius:100, margin:15, justifyContent:'center', alignItems:'center'}}>
                        <View style={{borderWidth:1, borderColor:show >= 1 ? theme.statusBar :theme.background, borderRadius:100, margin:15, justifyContent:'center', alignItems:'center'}}>
                            <View  style={{height:100, width:100, margin:'1%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <FontAwesome name="microphone" size={50} color={theme.statusBar} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        <Text style={{color:theme.text, fontSize:20}}>Listening...</Text>
    </View>
    )
}