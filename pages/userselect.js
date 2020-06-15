import * as React from 'react';
import { Feather, Entypo } from '@expo/vector-icons';
import { Animated, StyleSheet, Text, View, Modal, TouchableHighlight, Alert, ActivityIndicator, Image } from 'react-native';
import { Title, Subheading, Caption, Paragraph, Button, Divider } from 'react-native-paper';
import { Avatar, Card, IconButton, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { connect } from "react-redux"
import { auth ,firestore} from "../firebase/firebase.utils"
import firebase from "../firebase/firebase.utils"


function SetPP({navigation}) {
    const [ımgarray, setımg] = React.useState(null)
    const [loading, setloading] = React.useState(false)
    const [open, setopen] = React.useState(true)
    const uploadImage = async () => {




        setloading(true)
        if (ımgarray) {
            try {
                let Down = ''
                let userUid;
                setloading(true)

                let result = await fetch(ımgarray);
                result = await result.blob();
                const number = Date.now()
                var ref = firebase.storage().ref().child(`images/${number}`);
                await ref.put(result)
                const url = await ref.getDownloadURL()
                // Insert url into an <img> tag to "download"

                auth.currentUser.updateProfile({
                    photoURL: url
                })

                firestore.collection("users").doc(auth.currentUser.uid).set({
                    photoURL:url,
                    },{merge:true})
                    .then(function() {
                        setloading(false)


                        Alert.alert("successfully!");
                        console.log("OLDUUUUUUU")
                        setımg(null)
                        setloading(false)
                        setopen(false)
        navigation.navigate("Home")
                    })
                    .catch(function(error) {
                        Alert.alert("Error writing document: ");
                        setloading(false)
                    });



               
            } catch (e) {
                Alert.alert(JSON.stringify(e.message))
                setloading(false)
            }
        }
    }
    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setımg(result.uri)
            }
        }
    };

    console.log(ımgarray)
    return (
        <View style={styles.container}>

           


                <View style={styles.centeredView}>
                    {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (

<View style={styles.modalView}>
<AntDesign name="closecircleo" size={34} color="red" style={{ position: "absolute", top: 10, right: 10 }} onPress={() => {
    setopen(false)
    setloading(false)
}} />



<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
    <Button color="#1877F2" icon="camera" mode="contained" onPress={pickImage}>
        Select Img
</Button>
    {ımgarray&&<Button color="#1877F2" icon="share" mode="contained" onPress={uploadImage}>
        Set PP
</Button>}
</View>

</View>

                    )}

                  
                </View>
            

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
const s = state => ({
    user: state.user.user
})
export default connect(s)(SetPP);