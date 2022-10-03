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
import {signed, signedError} from "../../store/Slice/signInSlice";
import {signInService} from "../../services/auth/signIn.service";
import {HelperText, Snackbar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export default function SignIn({navigation}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    // const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [credintials, setCredentials] = useState({
        email: "",
        password: "",
        deviceName: Device.modelName
    });
    const hasErrors = () => {
        if (error) {
            return error;
        }

    };
    const handleSubmit = async () => {
        Keyboard.dismiss();
        try {
            await signInService(credintials).then((response) => {

                if (response.status === 201) {
                    AsyncStorage.setItem("@token", response.data.token)
                    dispatch(signed(response.data))
                    if (response.data.isAdmin) {
                        navigation.navigate('Main?')
                    }
                    navigation.navigate('Что делать?')
                    console.log("success")
                }
                if (response.status === 401) {

                    console.log("401")
                }
            }).catch(error => {
                dispatch(signedError())
                setError(true)
                setMessage(error.response.data.message)
            })
        } catch (e) {
            console.log("catch error")
        }
    }
    const emailChange = (val) => {
        setCredentials({...credintials, email: val});
    };
    const passwordChange = (val) => {
        setCredentials({...credintials, password: val});
    };
    const onDismissSnackBar = () => setError(false);

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
                <HelperText type="error" visible={hasErrors()}> {message}</HelperText>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Snackbar
                        style={styles.errorSnackBar}
                        visible={error}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'закрыть',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        {message}
                    </Snackbar>
                </View>
                <TextInput
                    defaultValue={credintials.email}
                    onChangeText={newText => emailChange(newText)}
                    style={styles.input}
                    placeholder='Email-адрес'
                    placeholderTextColor='white'
                    autoCorrect={true}
                    autoCapitalize={false}
                    autoCompleteType='email'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        defaultValue={credintials.password}
                        onChangeText={newPassword => passwordChange(newPassword)}
                        placeholder='Пароль'
                        placeholderTextColor='white'
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        textContentType='password'
                        // right={<Icon name={"eye"}/>}
                    />
                    <TouchableOpacity onPress={() => {
                        setShowPassword(!showPassword)
                    }} style={styles.eyeIcon}>
                        <Icon name={showPassword ? "eye" : "eye-off"} size={20} color={"white"}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    console.log("click")
                }}>
                    <Text style={styles.fpText}>Забыли пароль?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    handleSubmit()
                }}>
                    <Text style={styles.loginButtonText}>Войти</Text>
                </TouchableOpacity>
                <View style={styles.signUpTextView}>
                    <Text style={styles.signUpText}>У вас нет аккаунта? </Text>
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
    inputContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    eyeIcon: {
        height: 50,
        borderRadius: 5,
        right: 60,
        marginTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        padding: 10,
        // backgroundColor: "#a1c4fd",
        justifyContent: "center",
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
        color: 'white',
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
    errorSnackBar: {
        backgroundColor: "#EF5350",
    }
});
