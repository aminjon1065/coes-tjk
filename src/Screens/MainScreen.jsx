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
import GO from "./GO";

const Stack = createNativeStackNavigator();

const App = () => {
    const [token, setToken] = useState("");
    const dispatch = useDispatch()
    const storageToken = async () => {
        const tokenItem = await AsyncStorage.getItem('@token')
        setToken(tokenItem)
    }
    const deleteToken = async () => {
        await AsyncStorage.removeItem('@token')
    }
    useEffect(() => {
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
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name={"SignIn"} component={SignIn}/>
                    <Stack.Screen name={"SignUp"} component={SignUp}/>
                    {/*<Stack.Screen name={"Гражданская оборона"} component={GO} />*/}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
