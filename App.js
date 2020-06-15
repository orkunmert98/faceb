import React from 'react';
import { StyleSheet, Platform, StatusBar, Button, SafeAreaView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './components/navigation/navigator';
import { Feather } from '@expo/vector-icons'; 
import {decode, encode} from 'base-64'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {auth} from "./firebase/firebase.utils"
import { store, persistor } from './redux/store';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

function App({navigator,add}) {





  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'transparent' }} >

<Provider store={store}>
        
        <PersistGate persistor={persistor}>

      <View style={{ flex: 1 ,marginTop:25}} >
      
      <Navigator/>
      </View>
      </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});


export default App