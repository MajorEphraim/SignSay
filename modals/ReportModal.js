import React, {useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TextInput, Modal, FlatList, Image } from 'react-native'
import { themes } from '../constants/themes'
import { AntDesign, Ionicons} from '@expo/vector-icons';
import Button from '../components/Button'
// import useImagePicker from '../hooks/useImagePicker'
import { useSelector } from 'react-redux'
import { globalStyles } from '../constants/globalStyles'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { addDoc,collection,db, getStorage, ref, getDownloadURL, uploadBytes } from '../configs/firebaseConfigs'
import ActivityScreen from './ActivityScreen'
import { useGetConnection } from '../hooks/useGetConnection'

export default function ReportModal({openReport, setOpenReport}){
    
    const chosenTheme = useSelector(state=>state.themeState.theme)
    const theme = chosenTheme === 'dark' ? themes.darkMode : themes.lightMode

    const [images, setImages] = useState([
        {id:'1', icon:<AntDesign name="plus" size={35} color={theme.background}/>, image:null},
    ])

    const [report, setReport] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [openActivity, setOpenActivity] = useState(false)
    const isConnected = useGetConnection()

    useEffect(()=>{
        if(isConnected) {
            setErrorMsg(null)
        }else{
            setErrorMsg('No internet connection')
        }
    },[isConnected])

    const pickImage =()=>{
        setErrorMsg(null)
        let options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const image = response.assets[0].uri
            setImages((prevState)=>[...prevState, {id:image, icon:null, image, name:response.assets[0].fileName}])
          }
        });
    }

    const uploadImage = async(imageInfo)=>{
			
		const blob = await new Promise(resolve => {
			const xhr = new XMLHttpRequest()
			xhr.onload = () => resolve(xhr.response)
			xhr.responseType = 'blob'
			xhr.open('GET', imageInfo.image, true)
			xhr.send(null)
		})
        const storage = getStorage()
		const storageRef = ref(storage,'posts/'+ imageInfo.name)
        const snap = await uploadBytes(storageRef, blob)
		const url = await getDownloadURL(snap.ref)
		return url
	}

	const submitReport = async () => {
		try {
            if(report.length ==0 && images.filter(item=>item.id !='1').length == 0){
                return
            }
           
            if(!isConnected){
                setErrorMsg('No internet connection')
                return
            }
            setOpenActivity(true)
        
			const promises = []
			images.filter(item=>item.id !='1').forEach(item=>promises.push(uploadImage(item)))

			const bugsImages = await Promise.all(promises)
        
            await addDoc(collection(db, "reports"), {
                report,bugsImages
            });

            setOpenReport(false)
            setOpenActivity(false)
            setReport('')
            setImages([{id:'1', icon:<AntDesign name="plus" size={35} color={theme.background}/>, image:null}])

		} catch (error) {
			setErrorMsg(error.message)
            setOpenActivity(false)
		}

	}

    const removeImage = (id)=>{
        setImages((prevState)=>prevState.filter(item=>item.id !=id))
    }

    return(
    <Modal visible={openReport} animationType='fade'>
    <View style={{flex:1, flexDirection:'column', backgroundColor:theme.background, padding:15}}>
        <TouchableOpacity onPress={()=>setOpenReport(false)}>
            <AntDesign name="close" size={28} color={theme.text} />
        </TouchableOpacity>

        <View style={{flex:1,alignItems:'center', justifyContent: 'space-around'}}>
            <Text style={{...{color:theme.text},...globalStyles.modalHeader}}>Report</Text>

            <View style={{alignItems:'center'}}>
                <Text style={{...{color:theme.text},...globalStyles.modalText}}>Attach the screenshot(s) or explain</Text>
                <Text style={{...{color:theme.text},...globalStyles.modalText}}>the issue you are experiencing</Text>
            </View>

            <View style={{ height: images.length >3 ?'26%':'15%'}}>
                <FlatList
                    data={images.length == 6 ? images.filter(item=>item.image): images}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'space-evenly',
                       // padding: '5%',
                    }}
                    renderItem={({item})=>(
                        item.icon ? (
                            <TouchableOpacity onPress={pickImage} style={{width:80, height:80, backgroundColor:theme.text, borderRadius:10, marginHorizontal:'2.5%', marginVertical:'2.5%'}}>
                                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>{item.icon}</View>
                            </TouchableOpacity>
                        ):(
                            <View style={{width:80, height:80, backgroundColor:theme.text, borderRadius:10, marginHorizontal:'2.5%', marginVertical:'2.5%', alignItems:'flex-end'}}>
                                <TouchableOpacity style={{position:'absolute', zIndex:3}} onPress={()=>removeImage(item.id)}>
                                    <Ionicons name="remove-circle" size={24} color="red"/>
                                </TouchableOpacity>
                                <Image source={{uri:item.image}} style={{height:'100%', width:'100%', borderRadius:10}}/>
                            </View>

                        )

                    )}

                />

            </View>
            <TextInput
                style={{...{backgroundColor:theme.text, color:'#fff', flexDirection:'column'},...globalStyles.textInput}}
                placeholder='...explain your issue'
                placeholderTextColor={theme.placeholder}
                multiline={true}
                onChangeText={(text)=>{setReport(text); setErrorMsg(null)}}
                value={report}
            />
            <Text style={{color:'red'}}>{errorMsg ? errorMsg:null}</Text>
            <Button name={'Submit'} handlePress={submitReport}/>

        </View>
        <ActivityScreen openActivity={openActivity}/>
    </View>
    </Modal>
    )
}