import React from 'react';
import {Linking, StyleSheet} from "react-native";
import { FAB } from 'react-native-paper';

const Index = () => {
    return (
            <>
                <FAB
                    icon="phone"
                    label="112"
                    style={styles.btn}
                    color="green"
                    back
                    onPress={() => Linking.openURL(`tel: ${112}`)}
                />
            </>
    );
};

export default Index;

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 50,
    },
})