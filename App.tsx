import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/Configrations';
import MainNavigation from './src/navigation/mainNavigation';
import colors from './src/assets/colors';
import FCMServices from './src/services/FCM.service';
import { InitlilizeFCM } from './src/redux/actions/FcmAction';
import FCMLocalNotficarion from './src/services/FCMLocalNotification.service';

const App = () => {
  const fcmService = new FCMServices()
  const fcmLocalService = new FCMLocalNotficarion()
  // fcmLocalService.InitlializeLocalNotification()
  useEffect(() => {
    // fcmService.registerAppWithFCM().then(())
    store.dispatch(InitlilizeFCM())
  }, [])
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.WHITE_COLOR} barStyle={'dark-content'} />
        <MainNavigation />
      </View>
    </Provider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;
