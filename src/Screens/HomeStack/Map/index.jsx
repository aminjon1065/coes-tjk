import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from "react-native";
import MapView, {Callout, Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from "react-redux";
import TJK from './TJK1.geo.json'
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";

const Index = () => {
    const [emergency, setEmergency] = useState("");
    const selector = useSelector(state => state.locationDevice)
    const [khatar, setKhatar] = useState("245, 39, 39, 0.5");
    const [miena, setMiena] = useState("245, 230, 39, 0.5");
    const [none, setNone] = useState("245, 230, 39, 0");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const chooseEmergency = (e) => {
        setEmergency(e)
    }
    const emergencies = [
        {
            title: "Сел",
            value: "flood"
        },
        {
            title: "test1",
            value: "Test1"
        }
    ]
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
                        latitude: selector.latitude ? 38.874655 : 37.78825,
                        longitude: selector.longitude ? 70.978313 : -122.4324,
                        // latitudeDelta: 0.0922,
                        latitudeDelta: 12,
                        // longitudeDelta: 0.0421,
                        longitudeDelta: 5,

                    }}>
                    {
                        TJK.features.map(feature => {
                            const insertedObject = {
                                features: [feature]
                            };
                            if (feature.name === 'RRP') {
                                return <Geojson
                                    key={feature.id}
                                    geojson={insertedObject}
                                    fillColor={`rgba(${khatar})`}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={showModal}
                                />
                            }
                            if (feature.name === 'GBAO') {
                                return <Geojson
                                    key={feature.id}
                                    geojson={insertedObject}
                                    fillColor={'skyblue'}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log("GBAO")}
                                />
                            }
                            if (feature.name === 'KHATLON') {
                                return <Geojson
                                    key={feature.id}
                                    geojson={insertedObject}
                                    fillColor={'rgba(121, 22, 62, 0.4)'}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log("KHATLON")}
                                />
                            }
                            if (feature.name === 'SUGD') {
                                return <Geojson
                                    key={feature.id}
                                    geojson={insertedObject}
                                    fillColor={`rgba(${miena})`}
                                    strokeColor="#3949ab"
                                    strokeWidth={2}
                                    tappable
                                    onPress={() => console.log("SUGD")}
                                />
                            }
                            return <Geojson
                                key={feature.id}
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
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={styles.modal}>
                            {
                                emergencies.map((item) =>
                                    <Button key={item.value} onPress={hideModal}>{item.title}</Button>
                                )
                            }
                            <Text>Example Modal. Click outside this area to dismiss.</Text>
                        </Modal>
                    </Portal>
                    <Button style={styles.chooseEmerBtn} mode={"contained"} icon={"arrange-send-to-back"} onPress={showModal}>
                        Choose emergency
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
    modal:{
        paddingHorizontal:50,
    },
    chooseEmerBtn:{
        backgroundColor:"#336091"
    }
});