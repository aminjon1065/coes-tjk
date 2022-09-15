import {DrawerLayoutAndroid, Text, View} from "react-native";
import {Button} from "react-native-paper";
import Main from "../Screens/main";
import About from "../Screens/about";

const drawer = useRef(null);
const [drawerPosition, setDrawerPosition] = useState("left");
const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
        setDrawerPosition("right");
    } else {
        setDrawerPosition("left");
    }
};

const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
        <Text style={styles.paragraph}>I'm in the Drawer!</Text>
        <Button
            title="Close drawer"
            onPress={() => drawer.current.closeDrawer()}
        />
    </View>
);
return (
    <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
    >
        <View style={styles.container}>

            <Button
                title="Open drawer"
                onPress={() => drawer.current.openDrawer()}
            />
        </View>

        {/*Test*/}
        <Stack.Navigator initialRouteName="Main" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="КҲФ" component={Main}/>
            <Stack.Screen name="About" component={About}/>
        </Stack.Navigator>
        {/*test*/}

    </DrawerLayoutAndroid>
)

