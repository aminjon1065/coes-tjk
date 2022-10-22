import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions, View} from "react-native";
import {useTranslation} from "react-i18next";
import {LinearGradient} from 'expo-linear-gradient';


const Index = ({navigation}) => {
    const {t} = useTranslation();
    return (
        <View style={{...styles.container, backgroundColor: "black"}}>
            {/*<LinearGradient*/}
            {/*    // Button Linear Gradient*/}
            {/*    colors={['#ffffff','#E9E4F0','#D3CCE3',]}*/}
            {/*    style={styles.container}*/}
            {/*>*/}
            <Text style={styles.title}>КЧС Рекомендует</Text>
            <TouchableOpacity onPress={() => console.log("Pressed")}>
                <Text>{t('Safety.BathingSafetyTitle')}</Text>
            </TouchableOpacity>
            {/*</LinearGradient>*/}
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    },
    title: {
        alignSelf: "center",
        color: "white"
    }
})