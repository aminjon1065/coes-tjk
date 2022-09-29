import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {Button} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../../constant";

const CustomDrawer = (props) => {
    const [user, setUser] = useState(null);
    const [today, setToday] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
        if (AsyncStorage.getItem('@token')) {
            setToken(AsyncStorage.getItem('@token'))
            axios.post(`${BASE_URL}/login`,
                {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }
            ).then((res) => setUser(res.data))
                .catch((err) => {
                    console.log(err)
                })
        }

        // setToday(`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`)
        setToday(today)
    }, []);
    return (
        <>
            <View style={{flex: 1}}>
                <DrawerContentScrollView {...props}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 20,
                            backgroundColor: '#f6f6f6',
                            marginBottom: 20,
                        }}
                    >
                        {
                            user
                                ?
                                <>
                                    <View>
                                        <Text>{user?.data?.name}</Text>
                                        <Text>{user?.data?.email}</Text>
                                    </View>
                                    <Image
                                        source={{
                                            uri: `http://only.tj/avatrs${user?.data?.image}`,
                                        }}
                                        style={{width: 60, height: 60, borderRadius: 30}}
                                    />
                                </>
                                :
                                <Text style={styles.date}>
                                    {today}
                                </Text>
                        }
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                {
                    user
                        ?
                        null
                        :
                        <Button
                            mode={"text"}
                            textColor={"#3949ab"}
                            icon={"login"}
                            onPress={() => props.navigation.navigate('SignIn')}
                        >
                            Войти
                        </Button>
                }
                {/*<TouchableOpacity*/}
                {/*    style={styles.footer}*/}
                {/*>*/}
                {/*    <Text>Click</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 50,
        backgroundColor: '#f6f6f6',
        padding: 20,
    },
    date: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})