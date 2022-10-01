import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootDrawer from "../components/RootDrawer";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {isAuthService} from "../services/auth/isAuth.service";
import {useDispatch} from "react-redux";
import {isAuth, signedError} from "../store/Slice/signInSlice";

const Stack = createNativeStackNavigator();


const App = () => {
    const dispatch = useDispatch()
    const storageToken = AsyncStorage.getItem('@token')
    useEffect(() => {
        if (storageToken) {
            isAuthService(storageToken).then((response) => {
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
    }, [storageToken, dispatch])
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
