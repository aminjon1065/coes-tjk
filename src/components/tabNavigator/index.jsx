import React from 'react';
import Coes from "../../Screens/coes";
import Icon from "react-native-vector-icons/FontAwesome";
import Cuks from "../../Screens/cuks";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Index = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: false
        }}
        >
            <Tab.Screen name="Coes" component={Coes} options={{
                tabBarIcon: ({size, color}) => (<Icon name={"home"} size={size} color={color}/>)
            }}/>
            <Tab.Screen name="Cuks" component={Cuks} options={{
                tabBarIcon: ({size, color}) => (<Icon name={"fire"} size={size} color={color}/>)
            }}/>
        </Tab.Navigator>
    );
};

export default Index;