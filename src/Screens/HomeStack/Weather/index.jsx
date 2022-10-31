import {WebView} from 'react-native-webview';
import React from 'react';
import {View} from "react-native";

const Index = () => {
    return (
        <>
            <WebView
                source={{html: `<iframe src="https://www.ventusky.com/?p=38.80;71.41;6&l=temperature-2m&t=20221031/1900" frameborder="0" height="100%" width="100%"></iframe>`}}
                bounces={false}         // IOS Only
                dataDetectorTypes='link'
                scalesPageToFit={true}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={false}
                mediaPlaybackRequiresUserAction={true}
                style={{marginRight: 0, marginLeft: 1,}}
            />
        </>
    );
};

export default Index;