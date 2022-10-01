import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {signed} from "../../store/Slice/signInSlice";
import {signInService} from "../../services/auth/signIn.service";

export default function SignIn({navigation}) {
    const dispatch = useDispatch();
    const [credintials, setCredentials] = useState({
        email: "",
        password: "",
        deviceName: Device.modelName
    });
    const [hidePassword, setHidePassword] = useState(true);
    const handleSubmit = async () => {
        await signInService(credintials).then((response) => {
            if (response.status === 201) {
                AsyncStorage.setItem("@token", response.data.token)
                dispatch(signed(response.data))
                navigation.navigate('Что делать?')
            }
        }).catch(error => {
            dispatch(signedError())
        })
    }
    const emailChange = (val) => {
        setCredentials({...credintials, email: val});
    };
    const passwordChange = (val) => {
        setCredentials({...credintials, password: val});
    };

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
                    defaultValue={credintials.email}
                    onChangeText={newText => emailChange(newText)}
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
                    defaultValue={credintials.password}
                    onChangeText={newPassword => passwordChange(newPassword)}
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
