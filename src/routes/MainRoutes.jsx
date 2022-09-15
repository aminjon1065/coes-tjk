import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from 'react-navigation'
import App from "../Screens/main";
import About from "../Screens/about";

const screens = {
    Main: {
        screen: App
    },
    About: {
        screen: About
    }

}

const MainStacks = createStackNavigator(screens)

export  const Navigator = createAppContainer(MainStacks)