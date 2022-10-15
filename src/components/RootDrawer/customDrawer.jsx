import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Button} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/Slice/signInSlice";
import {apiRequest} from "../../helper/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";
import {SegmentedButtons} from 'react-native-paper';
import tj from "./../../assets/images/flags/tj.png"
import ru from "./../../assets/images/flags/ru.png"

const CustomDrawer = (props) => {
    const [today, setToday] = useState(null);
    const [lang, setLang] = useState("");
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
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
    const changeTj = async () => {
        setLang("tj")
        i18n.changeLanguage("tj")
        await AsyncStorage.setItem("lng", "tj")
        props.navigation.closeDrawer()
    }
    const changeRu = async () => {
        setLang("ru")
        i18n.changeLanguage("ru")
        await AsyncStorage.setItem("lng", "ru")
        props.navigation.closeDrawer()
    }
    return (
        <>
            <View style={{flex: 1}}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.containerLang}>
                        <SegmentedButtons
                            style={styles.langButtons}
                            buttons={[
                                {
                                    value: "ru",
                                    // label: "русский",
                                    icon: ru,
                                    onPress: changeRu
                                },
                                {
                                    value: "tj",
                                    // label: "тоҷикӣ",
                                    icon: tj,
                                    onPress: changeTj

                                }
                            ]}
                            value={lang}
                            onValueChange={setLang}
                            density="small"

                        />
                    </View>
                    <View
                        style={styles.container}
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
                                <View>
                                    <Text style={styles.date}>
                                        {today}
                                    </Text>
                                </View>
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
                            <Text>{t("Drawer.LogOut")}</Text>
                        </Button>
                        :
                        <Button
                            mode={"text"}
                            textColor={"#3949ab"}
                            icon={"login"}
                            onPress={() => props.navigation.navigate('SignIn')}
                        >
                            {t("Drawer.LogIn")}
                        </Button>
                }
            </View>
        </>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f6f6f6',
        marginBottom: 20,
    },
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
    },
    containerLang: {
        justifyContent: "center",
        backgroundColor: '#f6f6f6',
    },
    langButtons: {
        alignSelf: "center"
    }
})