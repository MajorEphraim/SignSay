import React,{useState} from 'react'
import SpeechComp from '../components/SpeechComp'
import TypingComp from '../components/TypingComp'
import { useSelector } from 'react-redux'
import Header from '../components/Header'

export default function Home(){

    let mode = useSelector(state=>state.modeState.mode)
    
    return (
        <>
            <Header/>
            {
                mode == 'false'? <TypingComp/> : <SpeechComp/>
            }
        </>
    )
    
    
}