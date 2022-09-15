import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import SearchContainer from "../../components/searchContainer";

const Index = () => {
    return (
        <View style={styles.main}>
            <SearchContainer/>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    main: {}
})