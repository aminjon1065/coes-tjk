import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import FirstBlock from "../../../components/homeComponents/firstBlock";
import {Divider} from "@rneui/base";
import {useTranslation} from "react-i18next";


const Index = ({navigation}) => {
    const {t} = useTranslation();

    return (
        <>
            <View>
                <FirstBlock navigation={navigation}/>
                <View style={styles.listContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreenTest")}>
                        <Text style={styles.listText}>{t('HomeScreen.CoESRecommended')}</Text>
                    </TouchableOpacity>
                    <Divider/>
                    <TouchableOpacity>
                        <Text style={styles.listText}>{t("HomeScreen.GO")}</Text>
                    </TouchableOpacity>
                    <Divider/>
                    <TouchableOpacity onPress={() => navigation.navigate("terrorism")}>
                        <Text style={styles.listText}>{t("HomeScreen.terrorism.title")}</Text>
                    </TouchableOpacity>
                    <Divider/>
                    <TouchableOpacity onPress={() => navigation.navigate("encyclopedia")}>
                        <Text style={styles.listText}>{t("HomeScreen.Encyclopedia")}</Text>
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