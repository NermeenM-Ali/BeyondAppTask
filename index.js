import React from 'react';
import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FCMServices from './src/services/FCM.service';

LogBox.ignoreAllLogs()
const fcmService = new FCMServices()
fcmService.backgroundListener()
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }
AppRegistry.registerComponent(appName, () => HeadlessCheck);
