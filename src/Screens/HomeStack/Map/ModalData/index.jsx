import React from 'react';
import {StyleSheet, Text} from "react-native";
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import {useTranslation} from "react-i18next";

const Index = ({visible, hideModal, district}) => {
    const containerStyle = {backgroundColor: 'white', padding: 20, borderRadius: 10};
    const {t} = useTranslation()

    return (
        <Provider>
            <Portal>
                <Modal visible={visible}
                       onDismiss={hideModal}
                       contentContainerStyle={containerStyle}
                       style={styles.modal}
                >
                    <Text>{t(`Districts.${district.district}`)}</Text>
                </Modal>
            </Portal>
        </Provider>
    );
};

export default Index;

const styles = StyleSheet.create({
    modal: {
        paddingHorizontal: 50,
    },
})