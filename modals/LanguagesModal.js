import React from 'react'
import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateLanguage } from '../redux/actions'


export default  function LanguagesModal({openLanguages,setOpenLanguages,setChosenLanguage}) {
    const languages = ['South African','American']

    const dispatch = useDispatch()

    return (
        <Modal visible={openLanguages} animationType='fade' transparent={true}>
            <View style={{flex:1, flexDirection:'column',alignItems:'center', paddingHorizontal:'5%', paddingTop:'47%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                <View>
                    <FlatList
                        data={languages}
                        keyExtractor={item=>item}
                        renderItem={(({item})=>(
                            <TouchableOpacity onPress={()=>{
                                setChosenLanguage(item); 
                                dispatch(updateLanguage(item)); 
                                setOpenLanguages(false)}} 
                                style={{backgroundColor:'white'}}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity> 
                        ))}
                    />
                </View>
            </View>
        </Modal>
    )
}