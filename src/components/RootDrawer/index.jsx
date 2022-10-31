import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Number from "../number";
import CustomDrawer from "./customDrawer";
import HomeStack from "../../Screens/HomeStack";
import About from "../../Screens/About";
import Icon from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";
import {ActivityIndicator, Image, TouchableOpacity, View, StyleSheet, Text, StatusBar} from "react-native";
import logo from "../../assets/images/logo.png";
import {useDispatch} from "react-redux";
import * as Location from "expo-location";
import {locationSet} from "../../store/Slice/locationSlice";
import Weather from "../weather";
const Drawer = createDrawerNavigator();
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
    const  LogoTitle =()=> {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <Image
                    style={{width: 45, height: 45, marginBottom:5, alignSelf: "center"}}
                    source={logo}
                />
            </TouchableOpacity>
        );
    }

    const {t} = useTranslation();
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor:"#336091"
                    },
                    headerTintColor:"white",
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <LogoTitle/>
                    ),
                    headerRight: () => (isLoading
                        ?
                        <ActivityIndicator/>
                        :
                            <TouchableOpacity onPress={() => navigation.navigate("weather")}>
                                <View style={styles.weatherContainer}>
                                    <Weather temperature={temperature} condition={conditional}
                                             error={errorMsg}/>
                                </View>
                            </TouchableOpacity>
                    )
                }}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name={"HomeStack"} component={HomeStack} options={{
                    drawerLabel: t("Drawer.Main"),
                    drawerIcon: () => (
                        <Icon name={"home"} size={24} color={"#336091"}/>
                    )
                }}/>
                <Drawer.Screen name={"About"} component={About} options={{
                    drawerLabel: t("Drawer.About"),
                    drawerIcon: () => (
                        <Icon name={"information-circle"} size={24} color={"#336091"}/>
                    )
                }}/>
            </Drawer.Navigator>
            <StatusBar barStyle={"light-content"} backgroundColor={"#336091"} translucent={true} />
            <Number/>
        </>
    );
};

export default Index;


const styles = StyleSheet.create({
    weatherContainer: {
        paddingRight: 15,
        color:"red"
    }
})