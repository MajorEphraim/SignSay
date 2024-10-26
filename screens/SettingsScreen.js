import React,{ useState } from 'react'
import {View, Text, FlatList, Switch, Image} from 'react-native'
import { themes } from '../constants/themes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StackHeader from '../components/StackHeader';
import StatusBar from '../components/StatusBar'
import { useSelector, useDispatch } from 'react-redux'
import { updateTheme } from '../redux/actions'
import logo from '../assets/icon.png'

export default function Settings(){

    const dispatch = useDispatch()
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    const [isOn, setIsOn] = useState(chosenTheme === 'dark' ? false : true)

    const icon1 = <MaterialCommunityIcons name="theme-light-dark" size={29} color={theme.text} />
    const icon2 = <FontAwesome name="sign-language" size={25} color={theme.text} />    
    const icon3 = <AntDesign name="caretdown" size={24} color={theme.text}/>
    const icon4 = <MaterialIcons name="record-voice-over" size={24} color={theme.text}/>
    const icon5 = <MaterialIcons name="speed" size={24} color={theme.text} />
    const icon6 = <MaterialIcons name="offline-share" size={24} color={theme.text}/>     
    
    
    const handleSwitch = (val)=>{

        setIsOn(val)

        const theme = val ? 'light' : 'dark'
       dispatch(updateTheme(theme))
    }
    
    const switch1 = <Switch
                    trackColor={{ false: theme.text, true: theme.text }}
                    thumbColor={isOn ? theme.background : theme.background}
                    ios_backgroundColor={theme.text}
                    onValueChange={val=>handleSwitch(val)}
                    value={isOn}
                />

    const data = [
        {id:'1', text:'Theme', text2:null, comp:switch1, icon:icon1, anIcon:null},
        {id:'2', text:'Sign Language', text2:'South African', comp:null, icon:icon2, anIcon:icon3},
        // {id:'3', text:'', text2:'speech', comp:switch1, icon:icon4, anIcon:null},
        {id:'4', text:'Speed', text2:null, comp:null, icon:icon5, anIcon:null},
        {id:'5', text:'Invite a friend', text2:null, comp:null, icon:icon6, anIcon:null},

    ]

    return(
        <>
        <StatusBar/>
        <StackHeader header={'Settings'}/>
        <View style={{flex:1,  backgroundColor:theme.background, paddingTop:'10%', paddingHorizontal:'5%'}}>
         {/* <View style={{width:'100%', flexDirection:'row', justifyContent:'center'}}>
            <Image 
                source={logo}
                style={{height:200, width:200}}
            />
         </View> */}
         <FlatList
            data={data}
            keyExtractor={item=>item.id}
            renderItem={({item})=>(
    
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:'5%'}}>
                        <View style={{flexDirection:'row', flex:1}}>
                            <View style={{width:'30%', flexDirection:'row', justifyContent:'flex-start'}}>
                                {item.icon}
                            </View>
                            <Text style={{fontSize:18, color:theme.text}}>{item.text}</Text>
                        </View>
                    
                        <View style={{flex:2, flexDirection:'column', alignItems:'flex-end'}}>
                                {item.comp}

                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                   {item.anIcon}
                                   <Text>{item.text2}</Text>
                                </View>
                            
                        </View>

                    </View>
                        )}
            />
    
        </View>
        </>
    )
}