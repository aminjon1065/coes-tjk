import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import WhatToDo from "../WhatToDo";
import CoESRecommended from "./CoESRecommended";
import Terrorism from "./Terrorism";
import Encyclopedia from "./Encyclopedia";


const Stack = createNativeStackNavigator();


const Index = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{
                    headerShown:false
                }}/>
                <Stack.Screen name={"HomeScreenTest"} component={CoESRecommended} options={{
                    headerTitle:"КЧС рекомендует"
                }}/>
                <Stack.Screen name={"WhatToDo"} component={WhatToDo} options={{
                    headerTitle:"Что делать"
                }}/>
                <Stack.Screen name={"terrorism"} component={Terrorism} options={{
                    headerTitle:"Угроза терроризма"
                }}/>
                <Stack.Screen name={"encyclopedia"} component={Encyclopedia} options={{
                    headerTitle:"Энциклопедия"
                }}/>
            </Stack.Navigator>
        </>
    );
};

export default Index;