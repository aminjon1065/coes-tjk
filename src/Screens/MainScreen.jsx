import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootDrawer from "../components/RootDrawer";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

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
                    <Stack.Screen name={"SignIn"} component={SignIn} />
                    <Stack.Screen name={"SignUp"} component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
