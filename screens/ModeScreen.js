import React,{useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import { updateFirstTime, updateTheme, updateMode } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { globalStyles } from '../constants/globalStyles'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguagesModal from '../modals/LanguagesModal'
import lightPic from '../assets/others/light-half.png'
import darkPic from '../assets/others/dark-half.png'
import lightVoice from '../assets/others/light-voice.png'
import darkVoice from '../assets/others/dark-voice.png'
import lightTyping from '../assets/others/light-typing.png'
import darkTyping from '../assets/others/dark-typing.png'

export default function Mode(){
    const dispatch = useDispatch()
    const [isLight, setIsLight] = useState(true)
    const [isVoice, setIsVoice] = useState(true)
    const [chosenLanguage, setChosenLanguage] = useState('select')
    const [openLanguages, setOpenLanguages] = useState(false)

    const setTheme =(val)=>{
        setIsLight(val)
    }
    
    const setMode =(val)=>{
        setIsVoice(val)
    }
    
    const handlePress = ()=>{
        if(chosenLanguage == 'select'){
            return
        }
        const theme = isLight ? 'light':'dark'
        const mode = isVoice ? 'true':'false'

        dispatch(updateMode(mode))
        dispatch(updateTheme(theme))
        dispatch(updateFirstTime())
    }

    return(
        <LinearGradient colors={['#75d1dd', '#5e99a7', '#1a7985']} style={{flex:1, alignItems:'center',paddingTop:25}}>
            <ScrollView contentContainerStyle={{flexDirection:'column',alignItems:'center'}}>
                <Text style={globalStyles.headingSelect}>Select</Text>
                <View style={{marginVertical:20, flexDirection:'column', alignItems:'center', marginBottom:'8%'}}>
                    <Text style={globalStyles.preferred}>Preferred Sign Language</Text>
                    <TouchableOpacity style={globalStyles.languageContainer} onPress={()=>setOpenLanguages(true)}>
                        <Text style={globalStyles.language}>{chosenLanguage}</Text>
                        <AntDesign name="caretdown" size={24} color='black'/>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:20, flexDirection:'column', alignItems:'center', marginBottom:'8%'}}>
                    <Text style={globalStyles.preferred}>Default Theme</Text>
                    <View style={globalStyles.radioBtnContainer}>
                        <View style={globalStyles.radioBtnTextContainer}>
                            <TouchableOpacity onPress={()=>setTheme(true)}>
                            {
                              isLight ? <Ionicons name="radio-button-on" size={24} color="#ffffff" /> : 
                                 <Ionicons name="radio-button-off" size={24} color="#ffffff" />
                            }
                            </TouchableOpacity>
                            <Text style={globalStyles.radioBtnText}>Light</Text>
                        </View>
                        <View style={globalStyles.radioBtnTextContainer}>
                            <TouchableOpacity onPress={()=>setTheme(false)}>
                            {
                                isLight ? <Ionicons name="radio-button-off" size={24} color="#ffffff" /> : 
                                    <Ionicons name="radio-button-on" size={24} color="#ffffff" />
                            }
                            </TouchableOpacity>
                            <Text style={globalStyles.radioBtnText}>Dark</Text>
                        </View>
                    </View>
                        <Image 
                            source={isLight ? lightPic:darkPic}
                            style={globalStyles.themePic}
                        />
                </View>
                <View style={{marginVertical:20, flexDirection:'column', alignItems:'center'}}>
                    <Text style={globalStyles.preferred}>Default Home Screen</Text>
                    <View style={globalStyles.radioBtnContainer}>
                        <View style={globalStyles.radioBtnTextContainer}>
                            <TouchableOpacity onPress={()=>setMode(true)}>
                            {
                              isVoice ? <Ionicons name="radio-button-on" size={24} color="#ffffff" /> : 
                                 <Ionicons name="radio-button-off" size={24} color="#ffffff" />
                            }
                            </TouchableOpacity>
                            <Text style={globalStyles.radioBtnText}>Voice</Text>
                        </View>
                        <View style={globalStyles.radioBtnTextContainer}>
                            <TouchableOpacity onPress={()=>setMode(false)}>
                            {
                                isVoice ? <Ionicons name="radio-button-off" size={24} color="#ffffff" /> : 
                                    <Ionicons name="radio-button-on" size={24} color="#ffffff" />
                            }
                            </TouchableOpacity>
                            <Text style={globalStyles.radioBtnText}>Typing</Text>
                        </View>
                    </View>
                    {
                        isLight ?(
                            <Image 
                                source={isVoice ? lightVoice:lightTyping}
                                style={globalStyles.screenPic}
                            />

                        ):(
                            <Image 
                                source={isVoice ? darkVoice:darkTyping}
                                style={globalStyles.screenPic}
                            />
                        )
                    }
                </View>
                
                {/* <View style={{backgroundColor:}}> */}
                    <TouchableOpacity onPress={handlePress} style={{...{borderColor:'#d6e2e4', borderWidth:1, justifyContent:'center', alignItems:'center', marginVertical:'8%'},...globalStyles.button}}>
                        <Text style={{...{color:'#d6e2e4'},...globalStyles.buttonText}}>Done</Text>
                    </TouchableOpacity>
                {/* </View> */}
                <LanguagesModal openLanguages={openLanguages} setOpenLanguages={setOpenLanguages} setChosenLanguage={setChosenLanguage}/>
            </ScrollView>
         </LinearGradient>
    )
}
