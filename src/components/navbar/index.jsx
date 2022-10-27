import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import logo from './../../assets/images/logo.png'
import {Button, FAB} from "react-native-paper";
// import {Linking} from 'react-native'
import {DrawerActions} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from 'expo-location';
import Weather from "../weather";
import {useDispatch, useSelector} from "react-redux";
import {locationSet} from "../../store/Slice/locationSlice";

const Index = ({navigation}) => {
    const dispatch = useDispatch();
    const [locationDevice, setLocationDevice] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [temperature, setTemperature] = useState(null);
    const [conditional, setConditional] = useState(null);
    const API_KEY = 'b09b579f44c76f6b427d548fdcfccdfe';
    useEffect(() => {
        const getLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Не разрешено!');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocationDevice(location.coords);
            dispatch(locationSet(location.coords))
            getWeather(location.coords.latitude, location.coords.longitude)
        };
        const getWeather = async (latitude, longitude) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
                const json = await response.json();
                setTemperature(json.main.temp)
                setConditional(...json.weather)
                setLoading(false);
            } catch (error) {
                setErrorMsg(error)
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        getLocation()
    }, []);
    const selector = useSelector(state => state.locationDevice)
    return (
        <View style={Platform.OS==="ios" ? styles.ios : styles.navbar}>
            <Button
                textColor={"white"}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
                <Text style={styles.hamburger}>
                    <Icon name={"menu"} size={26} color={"white"}/>
                </Text>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <Image source={logo} style={styles.logo}/>
            </TouchableOpacity>
            <View style={styles.weatherContainer}>
                {
                    isLoading
                        ?
                        <ActivityIndicator/>
                        :
                        <Weather temperature={temperature} condition={conditional}
                                 error={errorMsg}/>
                }
            </View>
            {/*<StatusBar animated={true} backgroundColor="#3949ab" barStyle="light-content"/>*/}
            {
                Platform.OS==="ios" ?  <StatusBar backgroundColor={"light"} barStyle={"dark-content"}/> : <StatusBar backgroundColor={"black"} barStyle={"light-content"}/>
            }
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    ios:{
        marginTop:50,
        flexDirection: "row",
        // backgroundColor: "#3949ab",
        backgroundColor: "red",
        height: 70,
        paddingBottom: 10,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4.65,
        elevation: 4,
    },
    navbar: {
        flexDirection: "row",
        // backgroundColor: "#3949ab",
        backgroundColor: "#336091",
        height: 70,
        paddingBottom: 10,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4.65,
        elevation: 4,

    },
    text: {
        color: "white",
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    hamburger: {
        alignItems: "center"
    },
    weatherContainer: {
        padding: 15
    }
})