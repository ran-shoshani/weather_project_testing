import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, BackHandler } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import ReloadIcon from './components/ReloadIcon'



const WEATHER_API_KEY = '1ec1c7ccea60970957f86597d69e0230'


// (open-weather-map website link)
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')




  useEffect(() => {
    load()
  }, [])
  async function load() {

    setCurrentWeather(null)
    setErrorMessage(null)

    // BackHandler API listener exit button
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?\nDo you want leave Weather App?" , [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };





    try {
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');

        // display error on console
        console.log('status not equal to granted')
        return
      }
      const location = await Location.getCurrentPositionAsync()


      const { latitude, longitude } = location.coords

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );


      // making an API call By geographic coordinates
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    
      // fetching API call
      const response = await fetch(weatherUrl)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)

        // to indicate response
        Alert('response = good')
      } else {
        // setErrorMessage(result.message)
        setErrorMessage("line 58 : response negative")
      }


    } catch (error) {
      setErrorMessage("line 64 : response not ok!")
    }

  }
  if (currentWeather) {

    return (

      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Weather App</Text>


        < ReloadIcon load={load} />

        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />

        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        < ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 100,
    marginBottom: 0,
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#61dafb',

  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
})
