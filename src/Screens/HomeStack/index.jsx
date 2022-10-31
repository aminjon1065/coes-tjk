import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import WhatToDo from "../WhatToDo";
import CoESRecommended from "./CoESRecommended";
import Terrorism from "./Terrorism";
import Encyclopedia from "./Encyclopedia";
import Laws from "./Laws";
import Map from "./Map";
import Weather from "./Weather";
import {useTranslation} from "react-i18next";
const Stack = createNativeStackNavigator();
const Index = () => {
    const {t} = useTranslation();
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: true,
                headerBackTitle:t('Functionality.back')
            }}>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name={"CoESRecommended"} component={CoESRecommended} options={{
                    headerTitle: t('HomeScreen.CoESRecommended'),
                }}/>
                <Stack.Screen name={"WhatToDo"} component={WhatToDo} options={{
                    headerTitle:t('HomeScreen.FirstBlock.WhatToDo')
                }}/>
                <Stack.Screen name={"map"} component={Map} options={{
                    headerTitle: t('HomeScreen.FirstBlock.RiskMap'),
                    headerShown:false
                }}/>
                <Stack.Screen name={"terrorism"} component={Terrorism} options={{
                    headerTitle: t('HomeScreen.terrorism.title')
                }}/>
                <Stack.Screen name={"encyclopedia"} component={Encyclopedia} options={{
                    headerTitle: "Энциклопедия"
                }}/>
                <Stack.Screen name={"laws"} component={Laws} options={{
                    headerTitle: "Законы",
                }}/>
                <Stack.Screen name={"weather"} component={Weather} options={{
                    headerTitle: t('Functionality.weather')
                }}/>
            </Stack.Navigator>
        </>
    );
};

export default Index;