import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/Configrations';
import MainNavigation from './src/navigation/mainNavigation';
import colors from './src/assets/colors';

const App = () => {

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
