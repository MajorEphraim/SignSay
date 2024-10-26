import types from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, collection, getDocs, where, query } from '../configs/firebaseConfigs'

export const updateFirstTime =()=>{

        return async(dispatch)=>{
     
             await AsyncStorage.setItem('firstTime', 'false')
                          
                 dispatch({
                     type:types.FIRST_TIME,
                     payload:'false'
                 })
                
         }
}

export const getFirstTime = ()=>{

   return async(dispatch)=>{

        const first_time = await AsyncStorage.getItem('firstTime')
        
        if(first_time != null){
            
            dispatch({
                type:types.FIRST_TIME,
                payload:first_time
            })
            
        }else if(first_time == null){
            
            dispatch({
                type:types.FIRST_TIME,
                payload: 'true'
            })
            
        }
    }
}

export const getMode = ()=>{

    return async(dispatch)=>{

        try {
            const mode = await AsyncStorage.getItem('mode')
            
            if(mode != null){
                
                dispatch({
                    type:types.GET_MODE,
                    payload:mode
                })
                
            }else if(mode == null){
                
                dispatch({
                    type:types.GET_MODE,
                    payload: 'false'
                })
                
            }
            
        } catch (error) {
            console.log(error.message)
        }
 
     }
}

 export const getTheme = ()=>{

    return async(dispatch)=>{

        try {
            const theme = await AsyncStorage.getItem('theme')
            
                dispatch({
                    type:types.GET_THEME,
                    payload:theme
                })
                    
        } catch (error) {
            console.log(error.message)
        }
 
     }
 }

 export const updateMode =(mode)=>{
    return async(dispatch)=>{

        try {
            
            await AsyncStorage.setItem('mode', mode)
            
            dispatch({
                type:types.UPDATE_MODE,
                payload:mode
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const getLanguage =()=>{
    return async(dispatch)=>{

        try {
            
            const language =  await AsyncStorage.getItem('language')
            
            dispatch({
                type:types.GET_LANGUAGE,
                payload:language
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const updateLanguage =(language)=>{
    return async(dispatch)=>{

        try {
            
            await AsyncStorage.setItem('language', language)
            
            dispatch({
                type:types.SET_LANGUAGE,
                payload:language
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const updateTheme =(theme)=>{
    return async(dispatch)=>{

        try {
            
            await AsyncStorage.setItem('theme', theme)
            
            dispatch({
                type:types.SET_THEME,
                payload:theme
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const updateModal =(val)=>{
    return async(dispatch)=>{

        try {
                        
            dispatch({
                type:types.UPDATE_MODAL,
                payload:val
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const fetchAllSigns =()=>{
    return async(dispatch, getState)=>{
        const language = getState().languageState.language
        try {

            const signsRef = collection(db, 'allSigns');
            const signQuery = query(signsRef)

            const signsSnapshot = await getDocs(signQuery);
            // const localSignsObj = await AsyncStorage.getItem('signs')
            
            
            // const localSigns = localSignsObj ? JSON.parse(localSignsObj).signs : []
            
            const signsList = signsSnapshot.docs.map(doc => doc.data());
            const signs = signsList[0].signs
            
            await AsyncStorage.setItem('signs', JSON.stringify({signs}))

            dispatch({
                type:types.FETCH_SIGNS,
                payload:signs
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const fetchLocalSigns =()=>{
    return async(dispatch, getState)=>{
        try {

            const localSignsObj = await AsyncStorage.getItem('signs')
            const localSigns = localSignsObj ? JSON.parse(localSignsObj).signs : []
             
            dispatch({
                type:types.FETCH_SIGNS,
                payload:localSigns
            })
            
        } catch (error) {
            console.log(error.message)
        }

    }
 }

 export const updateConnection = (val)=>{

    return (dispatch)=>{
        dispatch({
            type:types.UPDATE_CONNECTION,
            payload:val
        })
    }
 }
