import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import ScreenA from "./ScreenA";
import ScreenB from "./ScreenB";
import RootDrawer from "../../components/RootDrawer";


const Stack = createNativeStackNavigator();

const Index = ({navigation}) => {
    return (
        <>
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name={"drawer"} component={RootDrawer}/>
                    <Stack.Screen name={"ScreenA"} component={ScreenA}/>
                    <Stack.Screen name={"ScreenB"} component={ScreenB}/>
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
};

export default Index;