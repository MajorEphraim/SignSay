import React, {useState} from 'react'
import {View, TextInput, Platform,Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import StatusBar from '../components/StatusBar'
import HomeModal from '../modals/HomeModal'
import { useSelector } from 'react-redux'
import { themes } from '../constants/themes'
import { globalStyles } from '../constants/globalStyles'
import Tts from 'react-native-tts';
import WavesComp from './WavesComp'
import WordsComp from './WordsComp'

export default function TypingComp(){

    const isVisible = useSelector(state=>state.modalState.isVisible)
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    
    const [words, setWords] = useState(null)
    
    const [isStopped, setIsStopped] = useState(true)

    const sayWords = ()=>{
        if(words==null || words==''){
            return
        }
        setIsStopped(false)
        
        if (Platform.OS == 'ios') {
            Tts.speak(words, {
                iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                rate: 0.5,
            });
            
        }else{
            Tts.speak(words, {
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
            
        }

        setTimeout(()=>{
            setIsStopped(true)
            setWords(null)
        },words.replace(/\s/g, '').length*70)
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1, flexDirection:'column',justifyContent:'space-between', alignItems:'center', backgroundColor:theme.background}}>
                    <StatusBar/>
                    <View style={globalStyles.voiceContainer}>
                        {
                            isStopped ?(
                                <View style={{...globalStyles.instructionsContainer,...{borderColor:theme.text}}}>
                                    <Text style={{...globalStyles.instructionsWords,...{color:theme.text}}}>Type your words when you</Text>
                                    <Text style={{...globalStyles.instructionsWords,...{color:theme.text}}}>are ready</Text>
                                </View>
                            ):(
                                <WavesComp/>
                            )
                        }
                    </View>
                    <WordsComp sayWords={sayWords} words={words} setWords={setWords}/>
                    <HomeModal isVisible={isVisible}/>
                </View>
            </TouchableWithoutFeedback>

    )
}