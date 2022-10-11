import React from 'react';
import {Text, View, StyleSheet} from "react-native";

const Index = () => {
    return (
        <View>
            <Text style={styles.title}>КЧС Рекомендует</Text>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    title:{
        alignSelf:"center"
    }
})