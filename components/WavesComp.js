import React, {useState, useEffect} from 'react'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import waves_light from '../assets/others/waves_light.png'
import waves_light_flipped from '../assets/others/waves_light_flipped.png'
import waves_dark from '../assets/others/waves_dark.png'
import waves_dark_flipped from '../assets/others/waves_dark_flipped.png'

export default function WavesComp(){
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const waves = chosenTheme === 'dark' ? [waves_dark,waves_dark_flipped]: [waves_light,waves_light_flipped] 
    
    const [shownWave, setShownWave] = useState(null)
   useEffect(()=>{
    let mounted = true
    let i =0;
    const animate = ()=>{
        if(mounted){
            setShownWave(waves[i])
            i == 1 ? i=0 : i++
            setTimeout(animate,200)
        }
   }

   animate()
    return ()=>{
        mounted = false
    }
   },[])

    return(
        <Image
        source={shownWave}
        style={{height:'100%', width:'100%', }}
        />
    )   
}