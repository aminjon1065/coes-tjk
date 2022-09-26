import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {Button} from 'react-native-paper';

const Index = () => {
    const [val, setVal] = useState('')
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} defaultValue={val} onChangeText={newText => setVal(newText)}/>
            <Button
                icon="magnify"
                buttonColor={"#3949ab"}
                mode="outlined"
                textColor={"white"}
                onPress={() => {
                    console.log(val)
                    setVal('')
                }}
            >
                Поиск
            </Button>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation:20
    },
    input: {
        width: "70%",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#3949ab",
        borderRadius: 5,
        padding:5
    },
    button: {}
})