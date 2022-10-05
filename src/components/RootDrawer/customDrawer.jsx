import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {Button} from "react-native-paper";
import {useSelector} from "react-redux";

const CustomDrawer = (props) => {
    const [today, setToday] = useState(null);
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
        setToday(today)
    }, []);
    const user = useSelector(state => state.signIn)
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