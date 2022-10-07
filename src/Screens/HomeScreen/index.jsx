import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {Badge} from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

const Index = ({navigate}) => {
    return (
        <>
            <View>
                <View style={styles.blockContainer}>
                    <View style={styles.block}>
                        <Badge size={100} style={styles.badge}>
                            <Icon name={"ios-help-circle-outline"} size={80}/>
                        </Badge>
                        <Text>
                            Что делать?
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <Badge size={100} style={styles.badge}>
                            <Icon name={"ios-warning-outline"} size={80}/>
                        </Badge>
                        <Text>
                            Первая помощь
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <Badge size={100} style={styles.badge}>
                            <Icon name={"map"} size={80}/>
                        </Badge>
                        <Text>
                            Карта рисков
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};

export default Index;
const styles = StyleSheet.create({
    blockContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    block: {
        paddingTop: 20,
        alignItems: "center",
    },
    badge: {
        backgroundColor: "#516395",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})