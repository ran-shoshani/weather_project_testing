import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'

const WEATHER_API_KEY = '1ec1c7ccea60970957f86597d69e0230'
// '005f68f5b34a435838cef66af54297e35'
// 02fce8e3fb283a6f89e3dd66dd8744bf
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  
  const [errorMessage,setErrorMessage] = useState(null)
  const[currentWeather,setCurrentWeather] = useState(null)
  const[unitsSystem, setUnitsSystem] = useState('metric')


  useEffect(() =>{
    load()
  }, [])
  async function load(){
    try {
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted'){
        setErrorMsg('Permission to access location was denied');
        console.log('status not equal to granted')
        return
      }
      const location = await Location.getCurrentPositionAsync()

    
      const { latitude, longitude } = location.coords
    
      // reading the device location
      alert(`Latitude : ${latitude}, Longitude : ${longitude}`)
      
      // making an API call
      // no units 
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
      
      // option to add C or F
      // const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid={WEATHER_API_KEY}`
      
      
      const response = await fetch(weatherUrl) 
      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
        alert('all good')
      }else{
        // setErrorMessage(result.message)
        setErrorMessage("line 54 : response negative")
      }


    } catch (error) 
    {
      setErrorMessage("line 60 : response not ok!")
    }

  }
  if(currentWeather){
    // up to here
    const { main : {temp},} = currentWeather
    return (
      <View style={styles.container}>
        <Text>{temp}</Text>
        <StatusBar style="auto" />
      </View>
    )}else{
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
