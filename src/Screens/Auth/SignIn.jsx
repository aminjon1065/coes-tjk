import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import axios from "axios";
import {BASE_URL} from "../../constant";
import * as Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({navigation}) {
    const [datas, setDatas] = useState(null);
    useEffect(() => {
        StatusBar.setBarStyle('light-content', true);
        const dataFetch = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const json = await response.json();
                setDatas(json);
            } catch (error) {
                console.error(error);
            } finally {
                console.log("finally")
            }
        }
        dataFetch();
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    // console.log(datas);
    const handleSubmit = async () => {
        console.log("clicked")
        // try {
        //     await axios.post(`${BASE_URL}/login`, {
        //         email,
        //         password
        //     },).then((response)=>{
        //         console.log(response)
        //         console.log("wait response")
        //     });
        // } catch (error) {
        //     if (axios.isCancel(error))
        //     {
        //         console.log(error)
        //     }
        // }
        // await axios.post(`${BASE_URL}/login`, {
        //     'email': email,
        //     "password": password,
        //     "deviceName": Device.modelName
        // }).then((response) => {
        //     AsyncStorage.setItem("@token", response.data.token)
        //     console.log(response.data)
        //     console.log('clicked')
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <LinearGradient
                colors={['#0F2027', '#203A43', '#2C5364']}
                // colors={['#a1c4fd', '#c2e9fb']}
                style={styles.container}
            >
                <Text style={styles.welcomeText}>Добро пожаловать!</Text>
                <Text style={styles.loginText}>Войти</Text>
                <TextInput
                    defaultValue={email}
                    onChangeText={newText => setEmail(newText)}
                    style={styles.input}
                    placeholder='Email-адрес'
                    placeholderTextColor='#808e9b'
                    autoCorrect={true}
                    autoCapitalize={false}
                    autoCompleteType='email'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />
                <TextInput
                    defaultValue={password}
                    onChangeText={newPassword => setPassword(newPassword)}
                    placeholder='Пароль'
                    placeholderTextColor='#808e9b'
                    style={styles.input}
                    secureTextEntry={hidePassword}
                    textContentType='password'
                />
                <TouchableOpacity>
                    <Text style={styles.fpText}>Забыли пароль?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    // console.log(email)
                    handleSubmit()
                }}>
                    <Text style={styles.loginButtonText}>Войти</Text>
                </TouchableOpacity>
                <View style={styles.signUpTextView}>
                    <Text style={styles.signUpText}>У вас нет аккаунта?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={[styles.signUpText, {color: '#a1c4fd'}]}>
                            Создать
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center"
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#2C5364',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        // color: '#808e9b',
        color: '#fff',
    },
    fpText: {
        alignSelf: 'flex-end',
        // color: '#B33771',
        color: '#a1c4fd',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    loginButton: {
        // backgroundColor: '#833471',
        backgroundColor: '#a1c4fd',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        // color: '#fafafa',
        color: '#000',
        alignSelf: 'center',
    },
    loginWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    iconButton: {
        backgroundColor: '#333',
        padding: 14,
        marginHorizontal: 10,
        borderRadius: 100,
    },
    signUpTextView: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#808e9b',
        fontSize: 20,
        fontWeight: '500',
    },
});
