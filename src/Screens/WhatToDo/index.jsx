import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {whatToDoData} from "./whatToDoData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from "@react-navigation/native";
import js from "@react-native-community/geolocation/js";
import axios from "axios";

const Index = () => {
    const isFocused = useIsFocused();

    const [title, setTitle] = useState(null);
    const [descriptions, setDescriptions] = useState(null);
    // useEffect(() => {
        //     const storageGetFunc = async () => {
        //         const dataStorage = await AsyncStorage.getItem('@test')
        //         setTitle(dataStorage)
        //     }
        //     if (isFocused) {
        //         storageGetFunc();
        //     }

    // }, [isFocused])
    return (
        <View>
            <Text>
                Categories
            </Text>
        </View>
    );
};

export default Index;