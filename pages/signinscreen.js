import * as React from 'react';
import {View,Button} from 'react-native'
import Login from '../components/login/login'

function SingInScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Login navi={navigation}></Login>
      </View>
    );
  }
  export default SingInScreen;