import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'



export default function WeatherInfo({ currentWeather }) {
    const { main: { temp , temp_min, temp_max }, weather: [details], name ,dt} = currentWeather


    const { icon, main, description } = details

    
    // display time from ReactNative
    var month = new Date().getMonth() + 1; //Current Month
    var date = new Date().getDate(); //To get the Current Date
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds
    console.log(dt)

    // icon url 
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.WeatherInfo}>
            {/* Location/City  */}
            <Text style={styles.weatherCity}>{name}</Text>

             {/* date and time */}
            <Text style={styles.dateTime}>{date}/{month} {hours}:{min} {"\n"} </Text>
            
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />

            {/* .toFixed() to roundup the number/temp */}
            <Text style={styles.weatherMain}>{temp.toFixed()}°</Text>
            
            {/* <Text>{this.state.currentTime}</Text> */}
            <Text style={styles.weatherCity}>{main}{"\n"}</Text>
            <Text>MAX {temp_max.toFixed()}° - MIN {temp_min.toFixed()}°</Text>

            {/*for extra weather more specific  description */}
            {/* <Text>{description}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherInfo: {
        
        alignItems: 'center',
    },
    weatherIcon: {

        width: 100,
        height: 100,

    },
    weatherCity: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    weatherMain: {
        fontSize: 40,
        color: 'royalblue',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})
