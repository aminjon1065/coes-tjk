import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/Screens/MainScreen'


export default function MainApp() {
    return (
        <PaperProvider>
            <App/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => MainApp);