import React from 'react';
import Navbar from "../components/navbar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About from "./about";
import RootDrawer from "../components/RootDrawer";

const Stack = createNativeStackNavigator();

const App = () => {
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

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
