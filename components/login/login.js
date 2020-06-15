import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Images } from "./constants";
import ArButton from "./compo/Button";
import {adduser} from "../../redux/user"
import ArIcon from "./compo/Icon";
import ArInput from "./compo/Input";
import {auth} from "../../firebase/firebase.utils"
import { log } from "react-native-reanimated";
import {connect} from "react-redux"
const { width, height } = Dimensions.get("screen");

const Login=({navi,add})=> {
  const [email,setemail]=React.useState("")
  const [password,setpassword]=React.useState("")
const [loading,setloading]=React.useState(false)
const Log=()=>{
setloading(true)
auth.signInWithEmailAndPassword(email,password).then(()=>{setloading(false)
  const user=auth.currentUser
    
  add({email:user.email,name:user.displayName})
   Alert.alert("success")}).catch((e)=>{

setloading(false)
Alert.alert(JSON.stringify(e.message))

})


}


    return (
      <Block flex middle>
         <StatusBar hidden />
{loading?( <ActivityIndicator size="large" color="#0000ff" />):(
  <ImageBackground
  source={Images.RegisterBackground}
  style={{ width, height, zIndex: 1 }}
>
  <Block flex middle>
    <Block style={styles.registerContainer}>

      <Block flex>
        <Block flex={0.17} middle>
          <Text color="#8898AA" size={12}>
            Log In With Your Email
          </Text>
        </Block>
        <Block flex center>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            
            <Block width={width * 0.8} style={{ marginBottom: 15 }}>
              <ArInput
                borderless
                placeholder="Email"
                value={email}
                onChange={event => {setemail(event.nativeEvent.text)}}
                iconContent={
                  <ArIcon
                    size={16}
                    name="ic_mail_24px"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>
            <Block width={width * 0.8}>
              <ArInput
                password
                borderless
                onCh
                value={password}
                onChange={event => {setpassword(event.nativeEvent.text)}}
                placeholder="Password"
                iconContent={
                  <ArIcon
                    size={16}
                    name="padlock-unlocked"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>
            <Block middle>
              <ArButton style={styles.createButton} onPress={Log}>
                <Text bold size={14} style={{color:"white"}} >
                  Log In
                </Text>
              </ArButton>
            </Block>
            <Block middle>
              <ArButton style={styles.createButton} onPress={()=>navi.navigate("Sign Up")}>
                <Text bold size={14} style={{color:"white"}} >
                  Create New Account
                </Text>
              </ArButton>
            </Block>

          </KeyboardAvoidingView>
        </Block>
      </Block>
    </Block>
  </Block>
</ImageBackground>



)}

       
      
      </Block>
    );
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 100,
    borderRadius:20,
  backgroundColor:"#1877F2"
  }
});
const d=dispatch=>({
  add:(p)=>dispatch(adduser(p))
})
export default connect(null,d)(Login);
