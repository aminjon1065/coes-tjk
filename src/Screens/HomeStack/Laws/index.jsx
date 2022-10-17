import React from 'react';
import {ScrollView, Text, View} from "react-native";
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation();

    return (
        <View>
            <ScrollView>
                <Text style={{marginStart:10}}>{t("LawsScreen.1")}</Text>
            </ScrollView>
        </View>
    );
};

export default Index;