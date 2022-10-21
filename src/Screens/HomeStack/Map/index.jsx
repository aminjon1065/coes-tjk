import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from "react-native";
import MapView, {Callout, Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from "react-redux";
import TJK from './geoBoundaries-TJK-ADM1.geo.json'
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import landslides from "./../../../assets/images/Emergencies/landslides.png";
import avalanche from "./../../../assets/images/Emergencies/avalanche.png";
import earthquakes from "./../../../assets/images/Emergencies/earthquake.png";
import flood from "./../../../assets/images/Emergencies/flood.png";

const Index = () => {
    const [dushanbe, setDushanbe] = useState("");
    const [sugd, setSugd] = useState("");
    const [katlonColor, setKatlonColor] = useState("");
    const [gbao, setGbao] = useState("");
    const [rrp, setRrp] = useState("");
    const [emergency, setEmergency] = useState({});
    const selector = useSelector(state => state.locationDevice)
    const [khatar, setKhatar] = useState("245, 39, 39, 0.5");
    const [miena, setMiena] = useState("245, 230, 39, 0.5");
    const [none, setNone] = useState("245, 230, 39, 0");
    const [kam, setKam] = useState("rgba(51, 225, 107, 0.5)");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20, borderRadius: 10};
    const chooseEmergency = (e) => {
        setEmergency(e)
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


    const countEmer =
        [
            {
                district: "SUGD",
                count: 7
            },
            {
                district: "GBAO",
                count: 9
            },
            {
                district: "RRP",
                count: 5
            },
            {
                district: "KHATLON",
                count: 8
            },
            {
                district: "DUSHANBE",
                count: 2
            }
        ];

    countEmer.sort((a, b) => (b.count > a.count) ? -1 : 0)
    console.log(countEmer)
    const sumEmer = countEmer.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.count
    }, 0);

    // for (let i = 0; i < 5; i++) {

    // }

    return (
        <Provider>
            <View style={styles.container}>
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
                            if (feature.properties.shapeName === countEmer[0].district)
                            {
                                return <Geojson
                                    key={index}
                                    geojson={insertedObject}
                                    fillColor={`rgba(63, 241, 106, 0.5)`}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log(countEmer[index].district)}
                                />
                            }
                            if (feature.properties.shapeName ===countEmer[1].district ) {
                                return <Geojson
                                    key={index}
                                    geojson={insertedObject}
                                    fillColor={'rgba(139, 241, 63, 0.5)'}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log(countEmer[index].district)}
                                />
                            }
                            if (feature.properties.shapeName===countEmer[2].district) {
                                return <Geojson
                                    key={index}
                                    geojson={insertedObject}
                                    fillColor={'rgba(220, 241, 63, 0.5)'}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log(countEmer[index].district)}
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
                                    onPress={() => console.log("SUGD")}
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
                                    onPress={() => console.log("DUSHANBE")}
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
                    {/*<TJKMap/>*/}
                </MapView>
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
                                            onPress={() => chooseEmergency(item)}>
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
                    <Button style={styles.chooseEmerBtn} mode={"contained"} icon={"arrange-send-to-back"}
                            onPress={showModal}>
                        {t("SelectEmergency")}
                    </Button>
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
    }
});