import React, { useState } from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import ToggleSwitch from 'toggle-switch-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateMode, updateModal } from '../redux/actions'
import { themes } from '../constants/themes'

export default function Header(){

    let mode = useSelector(state=>state.modeState.mode)
    const dispatch = useDispatch()

    const chosenTheme = useSelector(state=>state.themeState.theme)
    // const isConnected = useSelector(state=>state.connectionState.isConnected)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    const [isOn, setIsOn] = useState(mode)
    
    const handleToggleSwitch = (val)=>{
        setIsOn(val)
        dispatch(updateMode(val))
    }

    return(
        <View style={{backgroundColor:theme.background, height:120, width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10}}>
            <TouchableWithoutFeedback onPress={()=>dispatch(updateModal(true))}>
                <Entypo name="dots-three-vertical" size={24} color={theme.text} />
            </TouchableWithoutFeedback>
            <ToggleSwitch
                isOn={isOn== 'true' ? true:false}
                onColor={theme.text}
                offColor={theme.text}
                thumbOnStyle={{backgroundColor:theme.background, height:40, width:40, borderRadius:50}}
                thumbOffStyle={{backgroundColor:theme.background, margin:1, height:40, width:40, borderRadius:40}}
                label={null}
                size="large"
                onToggle={isOn => handleToggleSwitch(`${isOn}`)}
            />
        </View>
    )
}