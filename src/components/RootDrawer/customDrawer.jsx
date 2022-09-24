import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {Button} from "react-native-paper";

const CustomDrawer = (props) => {
    const [user, setUser] = useState(null);
    const [today, setToday] = useState(null);
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
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
                                        <Text>Name User</Text>
                                        <Text>example@email.com</Text>
                                    </View>
                                    <Image
                                        source={{
                                            uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
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
                <Button
                    mode={"text"}
                    textColor={"#3949ab"}
                    icon={"login"}
                    onPress={() => props.navigation.navigate('SignIn')}
                >
                    Войти
                </Button>
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