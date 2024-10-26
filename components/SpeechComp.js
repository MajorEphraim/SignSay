import React,{ useState, useEffect } from 'react'
import RecordingComp from './RecordingComp'
import MicrophoneComp from './MicrophoneComp'
// import { Audio } from 'expo-av';
import Voice from '@react-native-voice/voice';
import { images, alphabetsImages, conjunctionsImages, punctuationMarks} from '../constants/data'
import { useSelector, useDispatch } from 'react-redux'
import { db, collection, getDocs, where, query } from '../configs/firebaseConfigs'
import { useGetConnection } from '../hooks/useGetConnection'
import { updateConnection, fetchAllSigns, fetchLocalSigns } from '../redux/actions'

export default function SpeechComp(){
    const [start, setStart] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [pictures, setPictures] = useState([])
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openRepeat, setOpenRepeat] = useState(false)
    const [results, setResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isWaiting, setIsWaiting] = useState(true)
    const language = useSelector(state=>state.languageState.language)
    const allSigns = useSelector(state=>state.signsState.allSigns)

    let allCloudWords = []
    const isConnected = useGetConnection()

    const dispatch = useDispatch()

    allSigns.forEach(word=>{
        allCloudWords = [...word.names,...allCloudWords]
    })

    useEffect(()=>{
        Voice.onSpeechStart = onSpeechStartHandler
        Voice.onSpeechEnd = onSpeechEndHandler
        Voice.onSpeechResults = onSpeechResultsHandler

        return ()=>{
            Voice.destroy()
            .then(Voice.removeAllListeners)
        }
    },[])

    useEffect(()=>{
        dispatch(fetchAllSigns())
        dispatch(fetchLocalSigns())
    },[])

    const makeArray = (word)=>{

        const words = []
        let text =word
        let emptySpaceIndex = text.indexOf(' ')
    
        let i = 0
        while (text.length > 0) {
            const newText = emptySpaceIndex != -1 ? text.substring(0,emptySpaceIndex) : text
    
            const startIndex = emptySpaceIndex != -1 ? emptySpaceIndex+1 : text.length
            const leftText = text.substring(startIndex,text.length)
    
            words.push({text:newText, textIndex:i})
            
            i++
            text = leftText
            emptySpaceIndex = leftText.indexOf(' ')
        }
        return words
    }

    const checkPunctuations = (text)=>{

        let arr = []
        let textArray = []
        let updatedText = ''
    
        for (let i = 0; i < text.length; i++) {
            arr.push({name:text[i], nameIndex:i})  
            textArray.push(text[i])  
        }
    
        punctuationMarks.forEach(mark=>{
        const markIndex = text.indexOf(mark.name)
        
            if(markIndex != -1){
                
                updatedText = ''
                
                while (textArray.indexOf(mark.name) != -1) {
                    const textMarkIndex = textArray.indexOf(mark.name)
                    textMarkIndex == 0 ? textArray.splice(0,1,'; ') : textArray.splice(textMarkIndex,1,' ;')
                }
                
                textArray.forEach(item=>{
                    let updatedItem = item.indexOf(';') != -1 ? ';' : item
                    updatedText = updatedText + updatedItem
                })
    
                textArray = []
                
                for (let i = 0; i < updatedText.length; i++) {
                    textArray.push(updatedText[i])  
                }
                
                while (textArray.indexOf(';') != -1) {
                    const textMarkIndex = textArray.indexOf(';')
                    textMarkIndex == 0 ? textArray.splice(0,1,`${mark.name} `) : textArray.splice(textMarkIndex,1,` ${mark.name}`)
                }
            }
        })
       
        return textArray.filter(item=>item != "'").join('')
    }

    const removeArticles = (word)=>{
        const words = []
        let text =word
        let emptySpaceIndex = text.indexOf(' ')
    
        let i = 0
        while (text.length > 0) {
            const newText = emptySpaceIndex != -1 ? text.substring(0,emptySpaceIndex) : text
    
            const startIndex = emptySpaceIndex != -1 ? emptySpaceIndex+1 : text.length
            const leftText = text.substring(startIndex,text.length)
    
            words.push(newText)
            
            i++
            text = leftText
            emptySpaceIndex = leftText.indexOf(' ')
        }
        return words.filter(item=>!['a','an', 'the'].includes(item)).join(' ') 
    }

    const arrangeWords = (sentence)=>{
        const array = makeArray(sentence.text)
        //console.log('Array', array)
        return sentence
    }
    
    const checkSentences = (text_)=>{
        
        let text =checkPunctuations(text_)
        console.log('text',text)
        let updatedText = removeArticles(text)
        let wordsArray = makeArray(updatedText)
        let leftWordsArray = wordsArray
        const sentences = []
        
        for (let i = 0; i < wordsArray.length; i++) {
            for (let j = 0; j < wordsArray.length; j++) {
                const startingIndex = i
                const stopingIndex = wordsArray.length - j
                
                const updatedWordsArray =leftWordsArray.filter(item=>item.textIndex>=startingIndex && item.textIndex<stopingIndex)
    
                const updatedWords = updatedWordsArray.map(item=>item.text).join(' ')
                images.concat(allSigns).forEach(item=>{
                    const textIndex = updatedWordsArray.length == 1 ? updatedWordsArray[0].textIndex : null
                    if(item.names.includes(updatedWords)){
                        sentences.push({text:updatedWords, textIndex, local:true, isVerb:item.isVerb})
                        leftWordsArray =leftWordsArray.filter(item=>updatedWordsArray.map(item=>item.textIndex).includes(item.textIndex) == false)
                    }else if(updatedWordsArray.length ==1){
                        leftWordsArray =leftWordsArray.filter(item=>updatedWordsArray.map(item=>item.textIndex).includes(item.textIndex) == false)
                        
                        const updatedWord = updatedWordsArray[0]

                        if (sentences.map(item=>item.textIndex).includes(textIndex) == false) {
                            sentences.push(updatedWord)
                        }
                    }
                })
                
            }
        }
        const localSigns = sentences.filter(item=>item.local).length
        
        let array = []
        for (let i = 0; i < sentences.length; i++) {
            if(!array.map(item=>item.textIndex).includes(sentences[i].textIndex) || sentences[i].textIndex == null){
                const sentence = sentences[i]
                const word = sentence.text
                const wordFiltered = sentences.filter(item=>item.text == word && typeof item.isVerb == 'boolean')
                const isVerb = wordFiltered.length > 0 ? wordFiltered[0].isVerb : null
                sentence.isVerb = isVerb
                array = [...array,arrangeWords(sentence)]
            }
        }

        const arrayLength = array.length
        return {words:array, cloudSigns:arrayLength-localSigns}
    }

    const findByAlphabets = (name)=>{
        const searched = [...images,...allSigns].filter(item=>item.names.includes(name))
        if(searched.length >0){
            return
        }

        const alphabets = []
        for(let i=0; i<name.length; i++){
            const image = alphabetsImages.filter(item=>item.name == name[i])[0]
            alphabets.push(image)
        }
        return alphabets
    }

    const fetchDatabaseImages = async(text)=>{
        let image = null

        if (!allCloudWords.includes(text)) {
            return {isFound:false,image:null, text}
        }


        try {
            const signsRef = collection(db, 'signs');
            const signQuery = query(signsRef, where('names', 'array-contains', text))

            const signsSnapshot = await getDocs(signQuery);

            const signsList = signsSnapshot.docs.map(doc => doc.data());
             image = signsList.length>0 && signsList[0].languages.includes(language) ? signsList[0].image : null
       } catch (error) {
            setErrorMsg(error.message)
            setIsLoading(false)
        }

        if(image !=null){
            return {isFound:true,image, text}
        }

        return {isFound:false,image:null, text}
    }

    const fetchLocalImages = async(text)=>{

        const calledImage1 = images.filter(item=>item.names.includes(text) && item.languages.includes(language))
        const calledImage2 = conjunctionsImages.filter(item=>item.name == text && item.languages.includes(language))
            
        const calledImage = calledImage1.length > 0 ? calledImage1 : calledImage2

            if(calledImage.length > 0){
            let image = calledImage[0].image
            return {isFound:true,image, text}
         }

        const response = await fetchDatabaseImages(text)
        return response
    }

    const fetchImages = async(text)=>{
        let words = makeArray(text)
        const response = await fetchLocalImages(text)
       if(response.isFound){
        return [response]
       }

       if(words.length <=1){
        const alphabets = findByAlphabets(text)

         return alphabets
       }
          
       let promises = []

       words.forEach(async word=>promises.push(fetchLocalImages(word)))
       const resp = await Promise.all(promises)

       const allImages = []

       resp.forEach(item=>{
           if(item.isFound){
               allImages.push(item)
           }else{
            const alphabets = findByAlphabets(item.text)
                alphabets.forEach(alphabet=>{
                    allImages.push(alphabet)
                })
           }
       })
       return allImages
    }

    const findWords = async() =>{
      
        try {
            setOpenConfirm(false)
            const {words, cloudSigns} = checkSentences(results)

            const sentences = words.map(item=>item.text)
            
            const cloudData = sentences.filter(text=>allCloudWords.includes(text))
            
            if (cloudData.length>0) {
                setIsLoading(true)
            }

            if (cloudData.length>0 && !isConnected) {
                dispatch(updateConnection(isConnected))
                setIsLoading(false)
                setErrorMsg('You are not connected to internet')
                return
            }

            if (isConnected) {
                setErrorMsg(null)
            }

            dispatch(updateConnection(true))
            const promises = []
            sentences.forEach(async sentence=>promises.push(fetchImages(sentence)))

            const resp = await Promise.all(promises)
            setIsLoading(false)
            let pictures =[]
            resp.forEach(pics=>{
                pictures = [...pictures,...pics]
            })

            setPictures(pictures)
            
        } catch (error) {
            setErrorMsg(error.message)
            setIsLoading(false)
        }
            
    }

    // const updatePictures = ()=>{
    //     alert()
    //     const prevPictures = pictures
    //     setPictures([])
    //     setPictures(prevPictures)
    // }

    const onSpeechStartHandler =(e)=>{
        console.log('start handler', e)
    }
    
    const onSpeechEndHandler =(e)=>{
        console.log('end handler', e)
    }
    
    const onSpeechResultsHandler =async(e)=>{
        let text = e.value[0]
        setResults(text.toLowerCase())
        setOpenConfirm(true)
        setIsWaiting(false)
    }
    
    const startRecording = async()=>{
        try {
            // await Audio.requestPermissionsAsync();
            // const { status } = await Audio.requestPermissionsAsync()
          
            // if(status == 'granted'){
                
                // await Audio.setAudioModeAsync({
                //     allowsRecordingIOS: true,
                //     playsInSilentModeIOS: true,
                // }); 
                
                await Voice.start('en-US')
                setStart(true)
                setIsWaiting(true)
            //}
            
        } catch (error) {
            setErrorMsg(error.message)
        }
    }
    
    const stopRecording = async()=>{
        
        try {
            await Voice.stop()
            await Voice.destroy()
            setStart(false)
            setOpenConfirm(false)
            setOpenRepeat(false)
            setErrorMsg(null)
            setPictures([])
        } catch (error) {
            setErrorMsg(error.message)
        }
    }
    
    return start ? <RecordingComp 
                    stopRecording={stopRecording} 
                    findWords={findWords}
                    openConfirm={openConfirm} 
                    pictures={pictures}
                    results={results}
                    isLoading={isLoading}
                    isWaiting={isWaiting}
                    errorMsg={errorMsg}
                    openRepeat={openRepeat}
                    setOpenRepeat={setOpenRepeat}
                    />:
                    <MicrophoneComp 
                    startRecording={startRecording}
                    />
    
}