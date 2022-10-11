import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FirstBlock = ({navigation}) => {
    return (
        <>
            <View style={styles.blockContainer}>
                <View style={styles.block}>
                    <TouchableOpacity
                        style={{alignItems: "center"}}
                        onPress={() => navigation.navigate("WhatToDo")}
                    >
                        <Icon name={"ios-help-circle-outline"} size={50} color={"#516395"}/>
                        <Text>
                            Что делать?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <TouchableOpacity
                        style={{alignItems: "center"}}
                        onPress={() => console.log("Первая помощь")}
                    >
                        <Icon name={"ios-warning-outline"} size={50} color={"#516395"}/>
                        <Text>
                            Первая помощь
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <TouchableOpacity
                        style={{alignItems: "center"}}
                        onPress={() => console.log("Карта рисков")}
                    >
                        <Icon name={"map-outline"} size={50} color={"#516395"}/>
                        <Text>
                            Карта рисков
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default FirstBlock;
const styles = StyleSheet.create({
    blockContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    block: {
        paddingTop: 20,
        alignItems: "center",
    },
    badge: {
        backgroundColor: "#516395",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})