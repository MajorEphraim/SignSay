import React, { useState } from 'react'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

const useImagePicker=()=>{

    const [image, setImage] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const getPermissions = async () => {

        try {
            const { status } = await Camera.requestPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert(
                    'Permissions Denied!',
                    "We can't access your images to set a profile picture",
                    [{ text: 'Okay', onPress: () => null }]
                )
            }
    
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.3,
            })
    
            if (!result.cancelled) {
                setImage(result.uri)
    
            }
            
        } catch (error) {
            setErrorMsg(error.message)
        }
	}

    getPermissions()

    return {image, errorMsg}

}

export default useImagePicker