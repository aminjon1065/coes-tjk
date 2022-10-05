import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity, Image,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {signed, signedError} from "../../store/Slice/signInSlice";
import {signInService} from "../../services/auth/signIn.service";
import {HelperText, Snackbar} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import {signUpService} from "../../services/auth/signUp.service";
import axios from "axios";
import {apiRequest} from "../../helper/apiRequest";
import {BASE_URL} from "../../constant";

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [imageName, setImageName] = useState(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [credintials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        image: {}
    });
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("initState");
    const [image, setImage] = useState("");

    const emailChange = (val) => {
        setEmail(val)
        setCredentials({...credintials, email: val});
    };

    const nameChange = (val) => {
        setName(val)
        setCredentials({...credintials, name: val});
    };

    const passwordChange = (val) => {
        setPassword(val)
        setCredentials({...credintials, password: val});
    };
    const onDismissSnackBar = () => setError(false);
    const selectAvatar = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Нет разрешения!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (pickerResult.cancelled === true) return;
        let localUri = await pickerResult.uri;
        let filename = await localUri.split('/').pop();
        setImageName(pickerResult.uri)
        setCredentials({...credintials, image: pickerResult});
        setImage(pickerResult)
    }

    const handleSubmit = async () => {
        Keyboard.dismiss();
        const uri =
            Platform.OS === "android"
                ? image.uri
                : image.uri.replace("file://", "");
        const filename = image.uri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("admin", 0);
        formData.append("image", {
            uri,
            name: `image.${ext}`,
            type,
        });
        console.log(formData)
        try {
            const { data } = await axios.post(`${BASE_URL}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (!data) {
                alert("Image upload failed!");
                return;
            }
            console.log(data)
            alert("Image Uploaded");
        } catch (err) {
            console.log(err.response);
            alert("Something went wrong");
        } finally {
            console.log("finally")
            // setImage(undefined);
        }
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
                {/*{image.uri && <Image source={{uri: image.uri}} style={{width: 100, height: 100}}/>}*/}
                {/*{image.uri && <Text>{credintials.image.uri}</Text>}*/}
                <TouchableOpacity onPress={() => {
                    console.log("click")
                }}>
                    <Text style={styles.fpText}>Забыли пароль?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Регистрация</Text>
                </TouchableOpacity>
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
    errorSnackBar: {
        backgroundColor: "#EF5350",
    }
});
