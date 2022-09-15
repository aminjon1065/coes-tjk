import {StyleSheet, View} from 'react-native';
import SearchContainer from "../../components/searchContainer";
import TabNavigator from "../../components/tabNavigator";

export default function Main({navigation}) {
    return (
        <View style={styles.container}>
            <TabNavigator/>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {},
    container: {
        flex: 1
    },

});
