import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity, ImagePickerIOS, Image,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {signed, signedError} from "../../store/Slice/signInSlice";
import {signInService} from "../../services/auth/signIn.service";
import {HelperText, Snackbar} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import image from "react-native-reanimated/src/reanimated2/component/Image";

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [imageName, setImageName] = useState(null);
    const [credintials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        image: null
    });

    const hasErrors = () => {
        if (credintials.email.length >= 3) {
            return !credintials.email.includes("@")
        }
    };
    const [hidePassword, setHidePassword] = useState(true);
    const handleSubmit = async () => {
        Keyboard.dismiss();
        try {
            await signInService(credintials).then((response) => {

                if (response.status === 201) {
                    AsyncStorage.setItem("@token", response.data.token)
                    dispatch(signed(response.data))
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
    const nameChange = (val) => {
        setCredentials({...credintials, name: val});
    };
    const passwordChange = (val) => {
        setCredentials({...credintials, password: val});
        setCredentials({...credintials, password_confirmation: val});
    };
    const onDismissSnackBar = () => setError(false);
    const selectAvatar = async () => {
        let avatarImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        })
        let localUri = await avatarImage.uri;
        let filename = await localUri.split('/').pop();
        setCredentials({...credintials, image: avatarImage})
        if (!avatarImage.cancelled) {
            setCredentials(...credintials, image.uri);
        }
    }
    console.log(imageName)
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
                <Text style={{...styles.loginText, color: "red"}}>Тестовый режим</Text>
                <Text style={styles.welcomeText}>Добро пожаловать!</Text>
                <Text style={styles.loginText}>Зарегистрироваться</Text>
                <HelperText type="error" visible={false}> Введите корректный email-адрес</HelperText>
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
                    defaultValue={credintials.name}
                    onChangeText={newText => nameChange(newText)}
                    style={styles.input}
                    placeholder='Имя и Фамилия'
                    placeholderTextColor='#808e9b'
                    autoCorrect={true}
                    autoCapitalize={false}
                    autoCompleteType='name'
                    keyboardType='name-phone-pad'
                    textContentType='name'
                />
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
                <TouchableOpacity onPress={() => selectAvatar()}>
                    <Text>
                        Choose
                    </Text>
                </TouchableOpacity>
                {imageName && <Text>{imageName}</Text>}
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
                    <Text style={styles.signUpText}>У вас нет аккаунта?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={[styles.signUpText, {color: '#a1c4fd'}]}>
                            Создать
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
        ;
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
    errorSnackBar: {
        backgroundColor: "#EF5350",
    }
});
