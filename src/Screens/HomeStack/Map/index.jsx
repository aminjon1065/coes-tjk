import React from 'react';
import {View, StyleSheet, Dimensions, Text} from "react-native";
import MapView, {Callout, Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from "react-redux";
import TJK from './TJK.geo.json'

const Index = () => {
    const selector = useSelector(state => state.locationDevice)
    console.log(selector);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: selector.latitude ? selector.latitude : 37.78825,
                    longitude: selector.longitude ? selector.longitude : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Geojson
                    geojson={TJK}
                    strokeColor="#3949ab"
                    fillColor="transparent"
                    strokeWidth={2}
                />
                {/*<Marker coordinate={{*/}
                {/*    latitude: selector.latitude ? selector.latitude : 37.78825,*/}
                {/*    longitude: selector.longitude ? selector.longitude : -122.4324,*/}
                {/*}}*/}
                {/*        pinColor="black"*/}
                {/*>*/}
                {/*    <Callout>*/}
                {/*        <Text>*/}
                {/*            I'm here*/}
                {/*        </Text>*/}
                {/*    </Callout>*/}
                {/*</Marker>*/}
            </MapView>
        </View>
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
});