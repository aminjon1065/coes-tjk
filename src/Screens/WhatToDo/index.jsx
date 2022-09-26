import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {whatToDoData} from "./whatToDoData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from "@react-navigation/native";

const Index = () => {
    const isFocused = useIsFocused();

    const [title, setTitle] = useState(null);
    const [rendering, setRendering] = useState(false);
    const [descriptions, setDescriptions] = useState(null);
    useEffect(() => {
        const storageGetFunc = async () => {
            const dataStorage = await AsyncStorage.getItem('@test')
            setTitle(dataStorage)
        }
        if (isFocused) {
            storageGetFunc();
        }
    }, [isFocused])
    console.log(title)
    return (
        <View>
            <Text>
                Categories
            </Text>
            <Text>
                {title}
            </Text>
        </View>
    );
};

export default Index;