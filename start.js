import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';



export default function Start() {
    const [ready,setReady] = useState(false);
    const [error,setError] = useState(null);
    const [where,setWhere] = useState({lat:null,lng:null});
    const geoOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
    };
    const geoSuccess = (position) => {
        setReady(true);
        setWhere({lat: position.coords.latitude,lng:position.coords.longitude });
    }

    const geoFailure = (err) => {
        setError(err.message);
    }

    useEffect(()=> {
      const intervalId = setInterval(() => {
        Geolocation.getCurrentPosition( geoSuccess, 
                                        geoFailure,
                                        geoOptions
                                    );
        axios.get("http://192.168.1.24:5000/"+where.lat+"/"+where.lng).then((succ,err)=>{
            if (succ)
                console.log("sended successfully");
            else 
                console.log("err");
        }) ;
      }, 10000);

      console.log(where);
      return () => clearInterval(intervalId);
      
    },[where]);


    return (
        <View style={styles.container}>
            { !ready && (
            <Text style={styles.big}>This app works in the background.</Text>
            )}
            { error && (
            <Text style={styles.big}>{error}</Text>
            )}
            { ready && (
                <Text style={styles.big}>
                {
                `Latitude: ${where.lat}
                Longitude: ${where.lng}`
                }
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
},
big: {
    fontSize: 48
}
});
