import * as React from 'react';
import {View,Button} from 'react-native'
import Register from '../components/register/register'


function SingUpScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Register navi={navigation}></Register>
      </View>
    );
  }
  export default SingUpScreen;