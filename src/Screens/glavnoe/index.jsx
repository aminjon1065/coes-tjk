import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';

const Index = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getMovies = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <View>
            {
                isLoading
                    ?
                    <ActivityIndicator/>
                    :
                    <ScrollView>
                        {data.map((item, index) => (
                            <Text key={index}>{item.id}-{item.title}</Text>
                        ))}
                    </ScrollView>
            }
        </View>
    );
};

export default Index;