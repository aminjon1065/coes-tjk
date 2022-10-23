import React from 'react';
import {StyleSheet, Text, View} from "react-native";
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
                    <Text>{t('Locality')}: <Text
                        style={{color: "green"}}> {t(`Districts.${district.district}`)}</Text></Text>
                    <Text>{t('Type')}: <Text
                        style={{color: "red"}}>{t(`EmergenciesList.${district.emergency}`)}</Text></Text>
                    <Text>{t('Count')}: <Text style={{color: "green"}}>{t(`${district.count}`)}</Text></Text>
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