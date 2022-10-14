import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/Screens/MainScreen'
import {Provider} from "react-redux";
import {store} from "./src/store";
import i18n from "./src/languages/i18n";

export default function MainApp() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <App/>
            </PaperProvider>
        </Provider>
    );
}


AppRegistry.registerComponent(appName, () => MainApp);