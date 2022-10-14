import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Navbar from "../navbar";
import Number from "../number";
import CustomDrawer from "./customDrawer";
import HomeStack from "../../Screens/HomeStack";
import About from "../../Screens/About";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

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
                <Drawer.Screen name={"HomeStack"} component={HomeStack} options={{
                    drawerLabel: "Главная",
                    drawerIcon: () => (
                        <Icon name={"home"} size={24} color={"#336091"}/>
                    )
                }}/>
                <Drawer.Screen name={"About"} component={About} options={{
                    drawerLabel: "О приложении",
                    drawerIcon: () => (
                        <Icon name={"information-circle"} size={24} color={"#336091"}/>
                    )
                }}/>
            </Drawer.Navigator>
            <Number/>
        </>
    );
};

export default Index;