import React, {useState} from 'react';
import TJK from "../TJK1.geo.json";
import {Geojson} from "react-native-maps";

const Index = () => {
    const [RRP, setRRP] = useState([]);
    TJK.features.map(feature => {
        const insertedObject = {
            features: [feature]
        };
        if (feature.name === 'RRP') {
            return <Geojson
                geojson={insertedObject}
                fillColor={'orange'}
            />
        }
        return <Geojson
            geojson={insertedObject}
            fillColor={'red'}
        />
    })
    // console.log(TJK)
    // return <Geojson
    //     geojson={TJK}
    //     strokeColor="#3949ab"
    //     fillColor="yellow"
    //     strokeWidth={2}
    //     zIndex={10}
    // />
};

export default Index;