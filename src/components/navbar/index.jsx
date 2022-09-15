import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';
import logo from './../../assets/images/logo.png'
import {Button} from "react-native-paper";
import {Linking} from 'react-native'
import {DrawerActions} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Index = ({navigation}) => {
    return (
        <View style={styles.navbar}>
            <Button
                textColor={"white"}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
                <Text style={styles.hamburger}>
                    <Icon name={"menu"} size={26} color={"white"}/>
                </Text>
            </Button>
            <TouchableOpacity onPress={() => Linking.openURL("https://khf.tj")}>
                <Image source={logo} style={styles.logo}/>
            </TouchableOpacity>
            <Button mode={"text"} textColor={"white"} icon={"phone"}
                    onPress={() => Linking.openURL(`tel:${112}`)}>112</Button>
            <StatusBar/>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        backgroundColor: "#3949ab",
        height: 70,
        paddingBottom: 10,
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 9,
    },
    text: {
        color: "white",
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    hamburger: {
        alignItems: "center"
    }
})