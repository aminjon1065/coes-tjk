import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Image, ActivityIndicator} from "react-native";
import MapView, {Callout, Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from "react-redux";
import TJK from './geoBoundaries-TJK-ADM1.geo.json'
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import landslides from "./../../../assets/images/Emergencies/landslides.png";
import avalanche from "./../../../assets/images/Emergencies/avalanche.png";
import earthquakes from "./../../../assets/images/Emergencies/earthquake.png";
import flood from "./../../../assets/images/Emergencies/flood.png";
import {apiRequest} from "../../../helper/apiRequest";
import ModalData from "./ModalData";

const Index = () => {
    const [district, setDistrict] = useState({});
    const [loading, setLoading] = useState(true);
    const [emergency, setEmergency] = useState("flood");
    const [countEmer, setCountEmer] = useState(null);
    const selector = useSelector(state => state.locationDevice)
    const [visible, setVisible] = React.useState(false);
    const [visibleDistrict, setVisibleDistrict] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const modalDistrict = (e) => {
        setVisibleDistrict(true);
        setDistrict(e)
    }
    // const showModalDistrict = () => setVisibleDistrict(true);
    const hideModalDistrict = () => setVisibleDistrict(false);
    const districtTitle = (e) => setDistrict(e)
    const containerStyle = {backgroundColor: 'white', padding: 20, borderRadius: 10};
    const chooseEmergency = (e) => {
        setLoading(true)
        setEmergency(e)
        setLoading(false)
        hideModal()
    }

    const {t} = useTranslation()
    const emergencies = [
        {
            title: t("EmergenciesList.landslides"),
            value: "landslides"
        },
        {
            title: t("EmergenciesList.earthquake"),
            value: "earthquake"
        },
        {
            title: t("EmergenciesList.avalanche"),
            value: "avalanche"
        },
        {
            title: t("EmergenciesList.flood"),
            value: "flood"
        }
    ]

    useEffect(() => {
        const getEmerFN = async () => {
            await apiRequest.get(`/emergencies/${emergency}`).then((response) => {
                setCountEmer(response.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        }
        getEmerFN();
    }, [emergency]);
    return (
        <Provider>
            <View style={styles.container}>
                {
                    loading
                        ?
                        <ActivityIndicator/>
                        :
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            zoomEnabled={true}
                            minZoomLevel={5}  // default => 0
                            maxZoomLevel={15} // default => 20
                            initialRegion={{
                                latitude: 38.874655,
                                // latitude: selector.latitude ? selector.latitude : 38.874655,
                                // longitude: selector.longitude ? selector.longitude : 70.978313,
                                longitude: 70.978313,
                                // latitudeDelta: 0.0922,
                                latitudeDelta: 12,
                                // longitudeDelta: 0.0421,
                                longitudeDelta: 5,
                            }}>
                            {
                                TJK.features.map((feature, index) => {
                                    const insertedObject = {
                                        features: [feature]
                                    };
                                    if (feature.properties.shapeName === countEmer[0].district) {
                                        return <Geojson
                                            key={index}
                                            geojson={insertedObject}
                                            fillColor={`rgba(63, 241, 106, 0.5)`}
                                            strokeColor="#3949ab"
                                            strokeWidth={2}
                                            tappable
                                            onPress={() => modalDistrict(countEmer[0])}
                                        />
                                    }
                                    if (feature.properties.shapeName === countEmer[1].district) {
                                        return <Geojson
                                            key={index}
                                            geojson={insertedObject}
                                            fillColor={'rgba(139, 241, 63, 0.5)'}
                                            strokeColor="#3949ab"
                                            strokeWidth={2}
                                            tappable
                                            onPress={() => modalDistrict(countEmer[1])}
                                        />
                                    }
                                    if (feature.properties.shapeName === countEmer[2].district) {
                                        return <Geojson
                                            key={index}
                                            geojson={insertedObject}
                                            fillColor={'rgba(220, 241, 63, 0.5)'}
                                            strokeColor="#3949ab"
                                            strokeWidth={2}
                                            tappable
                                            onPress={() => modalDistrict(countEmer[2])}
                                        />
                                    }
                                    if (feature.properties.shapeName === countEmer[3].district) {
                                        return <Geojson
                                            key={index}
                                            geojson={insertedObject}
                                            fillColor={`rgba(241, 158, 63, 0.5)`}
                                            strokeColor="#3949ab"
                                            strokeWidth={2}
                                            tappable
                                            onPress={() => modalDistrict(countEmer[3])}
                                        />
                                    }
                                    if (feature.properties.shapeName === countEmer[4].district) {
                                        return <Geojson
                                            key={index}
                                            geojson={insertedObject}
                                            fillColor={`rgba(241, 65, 63, 0.5)`}
                                            strokeColor="#3949ab"
                                            strokeWidth={2}
                                            tappable
                                            onPress={() => modalDistrict(countEmer[4])}
                                        />
                                    }
                                    return <Geojson
                                        key={index}
                                        geojson={insertedObject}
                                        fillColor={'red'}
                                        strokeColor="#3949ab"
                                        strokeWidth={2}
                                    />
                                })
                            }
                        </MapView>
                }
                <ModalData hideModal={hideModalDistrict} visible={visibleDistrict} district={district}/>
                <View style={styles.btnContainer}>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}
                               style={styles.modal}>
                            {
                                emergencies.map((item, index) =>
                                    <View key={item.value}
                                          style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>
                                        <Button
                                            key={item.value}
                                            onPress={() => chooseEmergency(item.value)}>
                                            {/*{index + 1})*/}
                                            {item.title}
                                        </Button>
                                        {
                                            item.value === "landslides" ?
                                                <Image source={landslides}
                                                       style={styles.emerImg}
                                                />
                                                :
                                                item.value === "avalanche"
                                                    ?
                                                    <Image
                                                        source={avalanche}
                                                        style={styles.emerImg}
                                                    />
                                                    :
                                                    item.value === "earthquake"
                                                        ?
                                                        <Image source={earthquakes} style={styles.emerImg}/>
                                                        :
                                                        <Image source={flood} style={styles.emerImg}/>
                                        }
                                    </View>
                                )
                            }
                        </Modal>
                    </Portal>
                    <Button
                        style={styles.chooseEmerBtn}
                        mode={"contained"}
                        icon={"arrange-send-to-back"}
                        onPress={showModal}
                    >
                        {t("SelectEmergency")}
                    </Button>
                    <View style={styles.selectedContainer}>
                        <Text style={styles.titleEmergency}>{t("SelectedEmergency")}: </Text>
                        <Text style={styles.selectedEmergency}>{t(`EmergenciesList.${emergency}`)}</Text>
                    </View>
                </View>
            </View>
        </Provider>
    );
};

export default Index;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    btnContainer: {
        position: 'absolute',
        // height:"10%",
        top: '5%',
        left: '1%',
        // width: '50%',
        alignSelf: 'flex-start',
        // backgroundColor: "rgba(39, 136, 245, 0.5)"
    },
    select: {
        color: "white",
        backgroundColor: "red"
    },
    modal: {
        paddingHorizontal: 50,
    },
    chooseEmerBtn: {
        backgroundColor: "#336091",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    emerImg: {
        width: 24,
        height: 24,
        alignSelf: "center"
    },
    selectedContainer: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "space-around",
        backgroundColor:"#336091",
        borderRadius:5,
        marginTop:5
    },
    selectedEmergency: {
        backgroundColor: "#c20859",
        color: "white",
        borderRadius: 5,
        textAlign: "center"
    },
    titleEmergency: {
        color: "white",
        // backgroundColor:"#336091",
        borderRadius:4
    }
});