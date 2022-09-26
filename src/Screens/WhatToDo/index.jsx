import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {whatToDoData} from "./whatToDoData";

const Index = () => {
    const [title, setTitle] = useState(null);
    const [descriptions, setDescriptions] = useState(null);


       return (
        <View>
            <Text>
                Categories
            </Text>
        </View>
    );
};

export default Index;