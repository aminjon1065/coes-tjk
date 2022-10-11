import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import WhatToDo from "../WhatToDo";
import CoESRecommended from "./CoESRecommended";


const Stack = createNativeStackNavigator();


const Index = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen}/>
                <Stack.Screen name={"HomeScreenTest"} component={CoESRecommended} options={{
                    headerTitle:"КЧС рекомендует"
                }}/>
                <Stack.Screen name={"WhatToDo"} component={WhatToDo} options={{
                    headerTitle:"Что делать"
                }}/>
            </Stack.Navigator>
        </>
    );
};

export default Index;