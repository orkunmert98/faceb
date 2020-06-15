import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    AsyncStorage
} from "react-native";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from "react-native-vector-icons/Feather";
import prof from "../../assets/profil.png"
import edit from "../../assets/img/account.png"
import word from "../../assets/img/world.png"
import {auth} from "../../firebase/firebase.utils"
export default class StatusHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

            modalVisibleInfo: false
        };
    }

    _menu = null;
 
    setMenuRef = ref => {
      this._menu = ref;
    };
   
    hideMenu = () => {
      
      
      
      
        this._menu.hide();



    };
   
delete=()=>{

this.props.del()
    this.hideMenu()


}

    showMenu = () => {
      this._menu.show();
    };




    setmodalVisibleInfo(visible) {
        this.setState({ modalVisibleInfo: visible });
    }

    handleDelete = async (id) => {
        const token = await AsyncStorage.getItem('token')
        const headers = {
            'Authorization': 'Bearer ' + token,
        }
        var id = id
        axios.delete(`http://192.168.0.26:3000/posts/${id}`,{headers: headers})
            .then((res) => {
                this.setState({modalVisibleInfo: !this.state.modalVisibleInfo});
                alert('data berhasil dihapus')
            })
            .catch((error) => {
                alert(error);
            })
        }

    // handleUpdate = async (id) => {
    //      const token = await AsyncStorage.getItem('token')
    //      const headers = {
    //         'Authorization': 'Bearer ' + token,
    //       }
    //      const data = {
    //        post: this.state.post
    //      }
    //      const post = this.state.post
    //      axios.put(`http://192.168.0.26:3000/posts/${id}`, data, {headers: headers})
    //       .then((res) => {
    //           Navigation.pop(this.props.componentId);
    //       })
    //       .catch((error) => {
    //         alert(error);
    //       })
    //     }
    
    render() {
     
        return (
            <View style={styles.singlePostContainer}>
               
                
                <View style={styles.singlePostImg}>
                    <Image
                        style={styles.singlePostImgPic}
                        source={this.props.peopleImg?{uri:this.props.peopleImg}:prof}
                    />
                </View>
                <View style={styles.singlePostAuthor}>
                    <Text style={styles.singlePostAuthorName}>
                        {this.props.name}
                    </Text>
                    <View styles={{ flexDirection: "row" }}>
                        <Text style={styles.singlePostTime}>
                            {this.props.postTime} •
                            <Image
                                style={styles.singlePostPrivacy}
                                source={word}
                            />
                        </Text>
                    </View>
                </View>

             {auth.currentUser.email===this.props.id||auth.currentUser.email==="targaryengg15@gmail.com"||auth.currentUser.email===this.props.em?(

<TouchableOpacity
onPress={
 () => {
        this.setmodalVisibleInfo(true);
    }
}>



<View style={styles.singlePostMore}>

<Menu
ref={this.setMenuRef}
button={  <Icon onPress={this.showMenu} 
name="more-horizontal" type="material" color="#333" size={25}/>}
>
<MenuItem onPress={this.delete}>Delete</MenuItem>

<MenuDivider />

</Menu>



  
</View>
</TouchableOpacity>

             ):(null)}
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singlePostContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 12
    },
    singlePostImgPic: {
        height: 30,
        width: 30,
        borderRadius: 25,
        marginTop: 3
    },
    singlePostAuthor: {
        flex: 9,
        paddingLeft: 5
    },
    singlePostAuthorName: {
        fontWeight: "bold",
        fontSize: 17
    },
    singlePostTime: {
        fontSize: 14
    },
    singlePostMore: {
        flex: 1
    },
    singlePostPrivacy: {
        width: 12,
        height: 12
    }
});