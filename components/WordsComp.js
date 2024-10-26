import React from 'react'
import {View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { themes } from '../constants/themes'
import { globalStyles, verticalOffset} from '../constants/globalStyles'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function WordsComp({sayWords, words, setWords}){
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'position'} keyboardVerticalOffset={
            Platform.select({
               ios: () => 0,
               android: () => -verticalOffset
            })()
          }>

        <View style={globalStyles.wordsInput}>  
            <TextInput
                    style={{...{backgroundColor:theme.text, color:'#fff', flexDirection:'column'},...globalStyles.textInput}}
                    placeholder='...type your words here'
                    placeholderTextColor={theme.placeholder}
                    multiline={true}
                    onChangeText={(text)=>setWords(text)}
                    onSubmitEditing={sayWords}
                    value={words}
            />
            <TouchableOpacity onPress={sayWords}>
                <AntDesign name="sound" size={30} color={theme.text} />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )   
}