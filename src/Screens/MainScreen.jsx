import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootDrawer from "../components/RootDrawer";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {isAuthService} from "../services/auth/isAuth.service";
import {useDispatch} from "react-redux";
import {isAuth, signedError} from "../store/Slice/signInSlice";
import {apiRequest} from "../helper/apiRequest";
import {useTranslation} from "react-i18next";
import Navbar from "../components/navbar";

const Stack = createNativeStackNavigator();
const App = () => {
    const [token, setToken] = useState("");
    const [lng, setLng] = useState("");
    const dispatch = useDispatch()
    const {i18n} = useTranslation();
    const storageToken = async () => {
        const tokenItem = await AsyncStorage.getItem('@token')
        setToken(tokenItem)
    }
    const deleteToken = async () => {
        await AsyncStorage.removeItem('@token')
    }
    const getLng = async () => {
        const storageLng = await AsyncStorage.getItem("lng");
        setLng(storageLng)
    }
    useEffect(() => {
        getLng()
        i18n.changeLanguage(lng)
        const checkAuth = async () => {
            storageToken()
            if (token) {
                try {
                    await apiRequest.get('/isAuth', {
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    isAuthService(token).then((response) => {
                        if (response.status === 200) {
                            dispatch(isAuth(response.data))
                        }
                    })
                } catch (e) {
                    dispatch(signedError)
                    await deleteToken()
                }
            }
        }
        checkAuth()
    }, [token])
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen
                        name="Root"
                        component={RootDrawer}
                        options={{
                            headerShown: false,
                    }}
                    />
                    <Stack.Screen name={"SignIn"} component={SignIn}/>
                    <Stack.Screen name={"SignUp"} component={SignUp}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
