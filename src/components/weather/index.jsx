import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Index = ({temp, error}) => {
    const conditions = ["Thunderstorm", "Drizzle", "Rain", "Snow", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado", "Clear", "Clouds"]
    const weatherOption = [{
        Thunderstorm: {
            iconName: "thunderstorm"
        },
        Drizzle: {
            iconName: "weather-fog"
        },
        Rain: {
            iconName: "rainy"
        },
        Snow: {
            iconName: "snow"
        },
        Mist: {
            iconName: "weather-partly-cloudy"
        },
        Smoke: {
            iconName: "smoke"
        },
        Haze: {
            iconName: "day-haze"
        },
        Dust: {
            iconName: "weather-windy"
        },
        Fog: {
            iconName: "weather-fog"
        },
        Sand: {
            iconName: "weather-windy-variant"
        },
        Ash: {
            iconName: "weather-sunset"
        }
    }]
    let text = 'Загрузка..';
    if (error) {
        text = "Error";
    } else if (temp) {
        text = `${Math.round(temp?.main?.temp)}°`;
    }
    return (
        <>
            <View>
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
    }
})