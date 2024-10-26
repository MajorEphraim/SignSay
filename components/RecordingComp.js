import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import StatusBar from './StatusBar'
import { useSelector } from 'react-redux'
import HomeModal from '../modals/HomeModal'
import { themes } from '../constants/themes'
import { globalStyles } from '../constants/globalStyles'
import ConfirmModal from '../modals/ConfirmModal'
import ListeningComp from './ListeningComp'
import LoadingScreen from '../modals/LoadingScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RepeatModal from '../modals/RepeatModal'

export default function RecordingComp({
    stopRecording,findWords,
    openConfirm,pictures,results,
    isLoading,isWaiting,errorMsg,
    openRepeat,setOpenRepeat,
}){
    const isVisible = useSelector(state=>state.modalState.isVisible)
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    const [picture, setPicture] = useState(null)

     useEffect(()=>{
        let mounted = true
        
        let i =0

        const updatedPic = ()=>{
            
            if(mounted){
                setPicture(pictures[i].image)
                i++
                if(i>=pictures.length){
                    
                    setTimeout(()=>{
                        if(pictures.length>1){
                            setOpenRepeat(true)
                        }else{
                           // stopRecording()
                        }
                    },1000)
                    return
                }
                    setTimeout(updatedPic,700)
            }

        }

        if (pictures.length>0) {
            updatedPic()
        }
        
        return ()=>{
            mounted = false
        }
    },[pictures])

    const repeatAnimation = ()=>{
        setOpenRepeat(false)
        let mounted = true
        
        let i =0

        const updatedPic = ()=>{
            
            if(mounted){
                setPicture(pictures[i].image)
                i++
                if(i>=pictures.length){
                    
                    setTimeout(()=>{
                        setOpenRepeat(true)
                    },1000)
                    return
                }
                    setTimeout(updatedPic,700)
            }

        }

        if (pictures.length>0) {
            updatedPic()
        }
    }

    return(
        <View style={{flex:1, backgroundColor:theme.background, paddingVertical:50, paddingHorizontal:10}}>
           <StatusBar/>
           <View style={{flex:1, flexDirection:'column',justifyContent:'space-between',alignItems:'center', marginTop:50}}>
                <View style={globalStyles.imageContainer}>
                    {
                        errorMsg ? (
                            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Ionicons name="cloud-offline-outline" size={80} color={theme.text} />
                                <Text style={{color:theme.text}}>No internet connection</Text>
                            </View>
                        ):(

                            isWaiting ? <ListeningComp/> : (
                                <View style={{height:'100%', width:'100%', backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                                    <Image source={typeof picture == 'number' ? picture : {uri:picture}} style={globalStyles.image}/>
                                </View>
                            )
                        )
                    }
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                    <View style={{width:200, height:20, borderWidth:1, backgroundColor:theme.text, borderRadius:50}}></View>
                    <TouchableOpacity style={{width:40, height:40, borderWidth:1, backgroundColor:'red', borderRadius:50}} onPress={stopRecording}/>
                </View>
            </View>
            <ConfirmModal 
            openConfirm={openConfirm}
            findWords={findWords}
            results={results}
            stopRecording={stopRecording}
            />
            <RepeatModal
                openRepeat={openRepeat}
                repeatAnimation={repeatAnimation}
                stopRecording={stopRecording}
            />
            <HomeModal isVisible={isVisible}/>
            <LoadingScreen isLoading={isLoading} errorMsg={errorMsg} findWords={findWords}/>
        </View>
    )
}