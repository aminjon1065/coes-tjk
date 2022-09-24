import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Index = ({error, condition, temperature}) => {
    const weatherOption = {
        Thunderstorm: {
            iconName: "weather-partly-lightning"
        },
        Clear: {
            iconName: "white-balance-sunny"
        },
        Drizzle: {
            iconName: "weather-pouring"
        },
        Rain: {
            iconName: "weather-rainy"
        },
        Snow: {
            iconName: "weather-snowy"
        },
        Mist: {
            iconName: "weather-partly-cloudy"
        },
        Smoke: {
            iconName: "weather-cloudy"
        },
        Haze: {
            iconName: "weather-partly-cloudy"
        },
        Dust: {
            iconName: "weather-sunset"
        },
        Fog: {
            iconName: "weather-fog"
        },
        Sand: {
            iconName: "weather-windy-variant"
        },
        Ash: {
            iconName: "weather-windy-variant"
        },
        Clouds: {
            iconName: "apple-icloud"
        },
        Squall: {
            iconName: "weather-cloudy-arrow-right"
        },
        Tornado: {
            iconName: "weather-tornado"
        }
    }
    // console.log(weatherData)
    // const {main:{temp}, weather} = weatherData
    // console.log(weather[0].main)
    // // const condition
    let text = 'Загрузка..';
    if (error) {
        text = "Error";
    } else if (temperature) {
        text = `${Math.round(temperature)}°`;
    }
    return (
        <>
            <View>
                <Icon name={`${weatherOption[condition.main].iconName}`} style={styles.weatherIcon}/>
                <Text style={styles.weatherText}>
                    {text}
                </Text>
            </View>
        </>
    );
};

export default Index;

const styles = StyleSheet.create({
    weatherText: {
        color: "white"
    },
    weatherIcon: {
        color: "white",
        fontSize: 24
    }
})