import React, {useState} from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import { themes } from '../constants/themes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import StackHeader from '../components/StackHeader';
import ReportModal from '../modals/ReportModal';
import FeedbackModal from '../modals/FeedbackModal';
import { useSelector } from 'react-redux'

export default function Help(){
    const navigation = useNavigation()
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    const [openReport, setOpenReport] = useState(false)
    const [openFeedback, setOpenFeedback] = useState(false)

    const icon1 = <Ionicons name="information-circle-outline" size={26} color={theme.text} />
    const icon2 = <AntDesign name="questioncircleo" size={21} color={theme.text} />
    const icon3 = <FontAwesome5 name="book-open" size={19} color={theme.text}/>
    const icon4 = <MaterialIcons name="bug-report" size={26} color={theme.text} />
    const icon5 = <MaterialIcons name="feedback" size={22} color={theme.text} />

    const data = [
        {id:'1', text:'Terms of use & Privacy Policy', icon:icon1, screen:null},
        {id:'2', text:'FAQs', icon:icon2, screen:null},
        {id:'3', text:'About SignSay', icon:icon3, screen:'about'},
        {id:'4', text:'Report', icon:icon4, screen:null},
        {id:'5', text:'Feedback', icon:icon5, screen:null},
    ]

    const handlePress = (item)=>{
        const screen = item.screen
        const text = item.text

        if(screen){
            navigation.navigate(screen)
        }else{
            if(text == 'Report'){
                setOpenReport(true)
            }else if(text =='Feedback'){
                setOpenFeedback(true)
            }else{
                null
            }
        }
    }

    return(
        <>
        <StackHeader header={'Help'}/>
        <View style={{flex:1, backgroundColor:theme.background, paddingTop:'10%'}}>
         <FlatList
            data={data}
            keyExtractor={item=>item.id}
            renderItem={({item})=>(
                <TouchableOpacity activeOpacity={0} style={{flexDirection:'row', padding:'5%'}} onPress={()=>handlePress(item)}>
                    <View style={{width:'10%', flexDirection:'row', justifyContent:'center'}}>
                        {item.icon}
                    </View>
                    <Text style={{color:theme.text, fontSize:18}}>{item.text}</Text>
                </TouchableOpacity>
            )}
        />
        </View>
        <ReportModal openReport={openReport} setOpenReport={setOpenReport}/>
        <FeedbackModal openFeedback={openFeedback} setOpenFeedback={setOpenFeedback}/>
        </>
    )
}