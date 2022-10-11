import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Navbar from "../navbar";
import Number from "../number";
import CustomDrawer from "./customDrawer";
import HomeStack from "../../Screens/HomeStack";

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
                    drawerLabel: "Главная"
                }}/>
            </Drawer.Navigator>
            <Number/>
        </>
    );
};

export default Index;