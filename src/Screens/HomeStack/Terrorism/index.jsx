import React from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from "react-native";
import img from "./../../../assets/images/terrorism/terrorism.webp"
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>
                    {t("ThreatTerrorism.title")}
                </Text>
                <Image source={img} style={styles.img}/>

                <Text style={styles.text}>
                    {
                        t("ThreatTerrorism.1")
                    }
                </Text>
                <Text style={styles.text}>
                    {
                        t("ThreatTerrorism.2")
                    }
                </Text>
                <Text style={styles.text}>
                    {
                        t("ThreatTerrorism.3")
                    }
                </Text>
                <Text style={styles.text}>
                    {
                        t("ThreatTerrorism.4")
                    }
                </Text>
                <View>
                    <Text>{t("ThreatTerrorism.5")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.6")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.7")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.8")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.9")}</Text>
                </View>
                <Text style={{marginVertical: 3}}>
                    {t("ThreatTerrorism.10")}
                </Text>
                <View>
                    <Text>{t("ThreatTerrorism.11")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.12")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.13")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.14")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.15")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.16")}</Text>
                </View>
                <View>
                    <Text style={{marginVertical: 5}}>
                        {t("ThreatTerrorism.17")}
                    </Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.18")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.19")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.20")}</Text>
                    <Text
                        style={styles.ulText}>{t("ThreatTerrorism.21")}</Text>
                </View>
                <View>
                    <Text>{t("ThreatTerrorism.22")}</Text>
                    <Text>{t("ThreatTerrorism.23")}</Text>
                    <Text>{t("ThreatTerrorism.24")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.25")}</Text>
                    <Text style={styles.ulText}>{t("ThreatTerrorism.26")}</Text>
                </View>
                <Text style={styles.textSuccess}>
                    {t("ThreatTerrorism.27")}
                </Text>
                <Text style={styles.textSuccess}>
                    {t("ThreatTerrorism.28")}
                </Text>
            </ScrollView>
        </View>
    );
};

export default Index;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        marginVertical: 5,
        color: "#336091"
    },
    img: {
        alignSelf: "center",
        marginTop: 5
    },
    text: {
        marginVertical: 5
    },
    ulText: {
        color: "#af3030"
    },
    textSuccess: {
        color: "#047752",
        marginVertical: 10
    }
})