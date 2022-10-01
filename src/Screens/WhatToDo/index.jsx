import React from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";

const Index = () => {
    const selector = useSelector(state => state.signIn)
    return (
        <View>
            <Text>
                {selector?.user?.name}
                Categories
            </Text>
        </View>
    );
};

export default Index;