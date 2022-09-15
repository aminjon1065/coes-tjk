import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Main from "../../Screens/main";
import Categories from "../../Screens/categories";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import About from "../../Screens/about";
import Navbar from "../navbar";
import Glavnoe from "../../Screens/glavnoe";
import Number from "../number";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Index = ({navigation}) => {
    return (
        <>
            <Navbar navigation={navigation}/>
            <Drawer.Navigator screenOptions={{
                headerShown: false
            }}>

                <Drawer.Screen name="Главная" component={Glavnoe}/>
                <Drawer.Screen name="Main" component={Main}/>
                <Drawer.Screen name="Categories" component={Categories}/>
                <Drawer.Screen name="About" component={About}/>
            </Drawer.Navigator>
            <Number />

        </>
    );
};

export default Index;