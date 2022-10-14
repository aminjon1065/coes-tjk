import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Button} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/Slice/signInSlice";
import {apiRequest} from "../../helper/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
    const [today, setToday] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
        setToday(today)
    }, []);
    const user = useSelector(state => state.signIn)
    const token = AsyncStorage.getItem("@token")
    const logOutFC = async () => {
        await apiRequest.post("/logout", {}, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            AsyncStorage.removeItem("@token")
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
        dispatch(logOut())
    }
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
                            user.authentificated
                                ?
                                <>
                                    <View>
                                        <Text>{user?.user?.name}</Text>
                                        <Text>{user?.user?.email}</Text>
                                    </View>
                                    <Image
                                        source={{
                                            uri: `${user?.user?.image}`,
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
                    user.authentificated
                        ?
                        <Button
                            mode={"text"}
                            textColor={"#3949ab"}
                            icon={"logout"}
                            onPress={logOutFC}
                        >
                            <Text>Выйти</Text>
                        </Button>
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