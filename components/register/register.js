import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,Alert
} from "react-native";
import { Block, Checkbox, Text } from "galio-framework";
import { Images } from "./constants";
import {adduser} from "../../redux/user"
import ArButton from "./compo/Button";
import ArIcon from "./compo/Icon";
import ArInput from "./compo/Input";
import img from "../../assets/profil.png"
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils'
import {connect} from "react-redux"
const { width, height } = Dimensions.get("screen");

const Register = ({navi,add}) => {
  const [userCredentials,setCredentials] = React.useState({email:'',password:'',displayName:''})
  const {displayName,email,password} = userCredentials;
  const [loading,setloading]=React.useState(false)
  const handleSubmit = async event =>{
      event.preventDefault();
      setloading(true)
      try {
        
          const {user} = await auth.createUserWithEmailAndPassword(email,password);
          await createUserProfileDocument(user,{displayName,email,uid:auth.currentUser.uid});
         
         console.log(displayName)
          await auth.currentUser.updateProfile({
            displayName: displayName,
          photoURL:img
          })
        
          add({email:user.email,name:user.displayName})

setloading(false)
      } catch (e) {
setloading(false)
        Alert.alert(JSON.stringify(e.message))
      }
  }
  const handleChange = event =>{
      const { text } = event.nativeEvent;
      const type  = event.type;
      console.log(type)
      console.log(userCredentials)
      setCredentials({...userCredentials,[type] : text})
  }
  return(
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
             Sign Up With Your Email
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
                 placeholder='Your Name'
                 value={displayName}
                 onChange={event => {event.type='displayName' ;handleChange(event)}}
                 iconContent={
                   <ArIcon
                     size={16}
                     name="hat-3"
                     family="ArgonExtra"
                     style={styles.inputIcons}
                   />
                 }
               />
             </Block>
             <Block width={width * 0.8} style={{ marginBottom: 15 }}>
               <ArInput
                 borderless
                 placeholder={"email"}
                 name="email"
                 value={email}

                 onChange={event => {event.type='email' ;handleChange(event)}}
                 
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
                 name='password'
                 value={password}
                 placeholder={"password"}
                 onChange={event => {event.type='password' ;handleChange(event)}}
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
               <ArButton style={styles.createButton} onPress={handleSubmit}>
                 <Text bold size={14} style={{color:"white"}}>
                   CREATE ACCOUNT
                 </Text>
               </ArButton>
             </Block>
             
             <Block middle>
               <ArButton style={styles.createButton}  onPress={()=>navi.navigate("Sign In")}>
                 <Text bold size={14} style={{color:"white"}}>
                   I have Already An Account
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
    marginTop: 45,
    borderRadius:20,
    backgroundColor:"#1877F2"
  }
});
const d=dispatch=>({
  add:(p)=>dispatch(adduser(p))
})
export default connect(null,d)(Register);
