import React from 'react';
import {Button, Text, View} from "react-native";

const ScreenA = ({navigation}) => {
    return (
        <View>
            <Text>A</Text>
            <Button title={"ScreenB"} onPress={() => navigation.navigate("ScreenB")}/>
        </View>
    );
};

export default ScreenA;