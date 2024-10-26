import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/WelcomeScreen'
import Mode from '../screens/ModeScreen'
import Home from '../screens/HomeScreen'
import Settings  from '../screens/SettingsScreen'
import TermsOfUse from '../screens/TermsOfUse'
import AppInfo from '../screens/AppInfo'
import FAQs from '../screens/FAQs'
import Help from '../screens/HelpScreen'

import { useSelector, useDispatch } from 'react-redux'
import { getFirstTime, getMode, getTheme, fetchAllSigns, getLanguage, fetchLocalSigns } from '../redux/actions'

import SplashScreen from '../screens/SplashScreen'

const Stack = createStackNavigator()

export default function HomeStack(){

    const dispatch = useDispatch()
    let firstTime = useSelector(state=>state.firstTimeState.firstTime)
    let mode = useSelector(state=>state.modeState.mode)
    let theme = useSelector(state=>state.themeState.theme)


    useEffect(()=>{
      dispatch(getFirstTime())
      dispatch(getMode())
      dispatch(getTheme())
      dispatch(getLanguage())
      dispatch(fetchAllSigns())
      dispatch(fetchLocalSigns())
    },[])

    if(firstTime == null){
        return <SplashScreen/>
    }

    const isFirstTime = ()=>{
        return firstTime != null || firstTime == false
    }

    // if(isFirstTime() && mode == null || isFirstTime() && theme == null){
    //     return <SplashScreen/>
    // }
    
    return(
        <Stack.Navigator
            screenOptions={{
                    headerShown:false
            }}
        >
            {
              firstTime == 'false' ?(
                    <>
                        <Stack.Screen name='home' component={Home}/>
                        <Stack.Screen name='settings' component={Settings}/>
                        <Stack.Screen name='terms' component={TermsOfUse}/>
                        <Stack.Screen name='about' component={AppInfo}/>
                        <Stack.Screen name='faqs' component={FAQs}/>
                        {/* <Stack.Screen name='feedback' component={Feedback}/> */}
                        <Stack.Screen name='help' component={Help}/>
                    </>
                ):(
                    <>
                        <Stack.Screen name='welcome' component={Welcome}/>
                        <Stack.Screen name='mode' component={Mode}/>
                    </>
                )
            }


        </Stack.Navigator>
    )
}