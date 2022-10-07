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
import * as SecureStore from 'expo-secure-store';
import {apiRequest} from "../helper/apiRequest";

const Stack = createNativeStackNavigator();

const App = () => {
    const [token, setToken] = useState("");
    const dispatch = useDispatch()
    const storageToken = async () => {
        const tokenItem = await AsyncStorage.getItem('@token')
        setToken(tokenItem)
    }
    useEffect( () => {
        const checkAuth = async ()=>{
            storageToken()
            console.log(token)
            if (token) {
                await apiRequest.get('/isAuth', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                console.log("if")
                isAuthService(token).then((response) => {
                    console.log("isAuth")
                    if (response.status === 200) {
                        dispatch(isAuth(response.data))
                    }
                }).catch(error => {
                    if (error.response.status === 401) {
                        dispatch(signedError)
                        AsyncStorage.removeItem('@token')
                    }
                })
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
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name={"SignIn"} component={SignIn}/>
                    <Stack.Screen name={"SignUp"} component={SignUp}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
