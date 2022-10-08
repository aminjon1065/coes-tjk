import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import FirstBlock from "../../components/homeComponents/firstBlock";
import {Divider} from "@rneui/base";


const Index = ({navigation}) => {
    return (
        <>
            <View>
                <FirstBlock/>
                <View style={styles.listContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate("GO")}>
                        <Text style={styles.listText}>КЧС Рекомендует</Text>
                    </TouchableOpacity>
                    <Divider/>
                    <TouchableOpacity>
                        <Text style={styles.listText}>Гражданская оборона</Text>
                    </TouchableOpacity>
                    <Divider/>
                </View>
            </View>
        </>
    );
};

export default Index;
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
        // backgroundColor: "#939eb9"
        backgroundColor: "#fff"
    },
    listText: {
        padding: 10,
        // color: "#3f4c6b",
        color: "#516395",
        fontSize: 18
    }
})