import React, { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo"

export function useGetConnection(params) {
    const [isConnected, setIsConnected] = useState(true)

    // NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    //   });
    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected)
        });
      
        // Unsubscribe
        unsubscribe();
    })

    return isConnected
} 