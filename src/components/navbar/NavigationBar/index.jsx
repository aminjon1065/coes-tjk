import * as React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {Platform, View, StyleSheet} from 'react-native';
import {Divider} from "@rneui/base";
import {useTranslation} from "react-i18next";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const MyComponent = (props) => {
    const {t} = useTranslation();
    return (
        <>
            <View style={styles.container}>
                <Button icon={"arrow-left"} onPress={() => props.navigation.goBack()}>{t('Functionality.back')}</Button>
            </View>
            <Divider/>
        </>
    );
};

export default MyComponent;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start"
    }
})