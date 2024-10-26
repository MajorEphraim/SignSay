import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TextInput, Modal, FlatList } from 'react-native'
import { themes } from '../constants/themes'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import { globalStyles } from '../constants/globalStyles'
import { addDoc,collection,db } from '../configs/firebaseConfigs'
import ActivityScreen from './ActivityScreen'
import { useGetConnection } from '../hooks/useGetConnection'

export default function FeedbackModal({openFeedback, setOpenFeedback}){

    const [rated, setRated] = useState([])
    const [message, setMessage] = useState('')
    const [openActivity, setOpenActivity] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode
    const isConnected = useGetConnection()

    useEffect(()=>{
        if(isConnected) {
            setErrorMsg(null)
        }else{
            setErrorMsg('No internet connection')
        }
    },[isConnected])

    const handleRates = (index)=>{
        setErrorMsg(null)
        if(rated.length != index && rated.length-1 != index){
            return
        }

        if(rated.includes(index)){
            setRated(prevState=>prevState.filter(item=>item != index))
        }else{
            setRated(prevState=>[...prevState, index])
        }

    }

    const submitFeeback = async()=>{

        if(message.length==0 && rated.length == 0){
            return
        }
        if(!isConnected){
            setErrorMsg('No internet connection')
            return
        }
        setOpenActivity(true)
        try {
            await addDoc(collection(db, "feedback"), {
                message, 
                rate:rated.length
            });
            setOpenActivity(false)
            setOpenFeedback(false)
            setMessage('')
            setRated([])
            
        } catch (error) {
            setErrorMsg(error.message)
            setOpenActivity(false)
        }
    }

    return(
    <Modal visible={openFeedback} animationType='fade'>
    <View style={{flex:1, flexDirection:'column', backgroundColor:theme.background, padding:15}}>
        <TouchableOpacity onPress={()=>setOpenFeedback(false)}>
            <AntDesign name="close" size={28} color={theme.text} />
        </TouchableOpacity>

        <View style={{flex:1,alignItems:'center', justifyContent: 'space-around'}}>
            <Text style={{...{color:theme.text},...globalStyles.modalHeader}}>Feedback</Text>
            <View style={{alignItems:'center'}}>
                <Text style={{...{color:theme.text},...globalStyles.modalText}}>Your SignSay rating</Text>
                <Text style={{...{color:theme.text},...globalStyles.modalText}}>according to your experience</Text>
                <Text style={{...{color:theme.text},...globalStyles.modalText}}>would be appreciated</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <FlatList
                    data={[1,2,3,4,5]}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={5}
                    columnWrapperStyle={{
                        justifyContent: 'space-evenly',
                      // padding: '5%',
                    }}
                    renderItem={({item,index})=>(
                        <TouchableOpacity onPress={()=>handleRates(index)}> 
                            {
                                rated.includes(index) ?(
                                    <FontAwesome name="star" size={31} color={theme.text} />
                                ):(

                                    <FontAwesome name="star-o" size={31} color={theme.text}/>
                                )
                            }
                        </TouchableOpacity>
                    )}

                />

            </View>
            <TextInput
                style={{...{backgroundColor:theme.text, color:'#fff', flexDirection:'column'},...globalStyles.textInput}}
                placeholder='...write your feedback here'
                placeholderTextColor={theme.placeholder}
                multiline={true}
                onChangeText={(val)=>{setMessage(val);setErrorMsg(null)}}
            />
            <Text style={{color:'red'}}>{errorMsg ? errorMsg:null}</Text>
            <Button name={'Submit'} handlePress={submitFeeback}/>

        </View>
        <ActivityScreen openActivity={openActivity}/>
    </View>
    </Modal>
    )
}