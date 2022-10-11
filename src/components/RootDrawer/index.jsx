import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Main from "../../Screens/main";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import About from "../../Screens/about";
import Navbar from "../navbar";
import Glavnoe from "../../Screens/glavnoe";
import Number from "../number";
import CustomDrawer from "./customDrawer";
import WhatToDo from "../../Screens/WhatToDo";
import HomeScreen from "../../Screens/HomeScreen";
import GO from "../../Screens/GO";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Index = ({navigation}) => {
    return (
        <>
            <Navbar navigation={navigation}/>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{
                    drawerLabel: "Главная"
                }}/>
                <Drawer.Screen name="whatToDo" component={WhatToDo} options={{drawerLabel: "Что делать?"}}/>
                <Drawer.Screen name="Главная" component={Glavnoe}/>
                <Drawer.Screen name="Main" component={Main}/>
                <Drawer.Screen name="About" component={About}/>
                <Stack.Screen name={"GO"} component={GO}
                              options={{
                                  drawerItemStyle: {
                                      display: "none",
                                  },
                                  drawerLabel: "Гражданская оборона"
                              }}
                />

            </Drawer.Navigator>
            <Number/>
        </>
    );
};

export default Index;