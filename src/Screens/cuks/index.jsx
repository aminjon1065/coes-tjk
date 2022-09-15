import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const Index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                ЦЕНТР УПРАВЛЕНИЯ В КРИЗИСНЫХ СИТУАЦИЯХ
            </Text>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center"
    },
    title:{
        fontSize:24,
        color:"#3949ab",
        textAlign:"justify"
    }
})