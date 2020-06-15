import React, { Component } from "react";
import { View, Image, StyleSheet,TouchableOpacity } from "react-native";
import img1 from "../../assets/img/likethis.png"
import img2 from "../../assets/img/comment.png"
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import like from "../../assets/img/like.png"
import haha from "../../assets/img/haha.png"
import wow from "../../assets/img/wow.png"
export default class FooterPost extends Component {
constructor(s){
    super(s)
}

_menu = null;
 
setMenuRef = ref => {
  this._menu = ref;
};

hideMenu = () => {
  
  
  
  
    this._menu.hide();



};



showMenu = () => {
if(!this.props.allow){
    this._menu.show();

}else{
    this.props.likeit()
}


 
};




    render() {
        const {likeit,comment,id} =this.props
        return (
            <View style={styles.singlePostFooter}>



        <TouchableOpacity style={styles.singlePostFooterBtn} onPress={this.showMenu}  >
                    <View style={styles.singlePostBtnContent}>
                    <Menu
style={styles.singlePostFooterBtn}

          ref={this.setMenuRef}
          button={ 


       
                        
                        
                        <Image
                            style={styles.singlePostBtnIcon}
                            source={img1}
                        />
                   
          }
        >
          <View style={{flexDirection:"row"}}> 
<TouchableOpacity  style={{width:50}} onPress={()=>{

this.props.setemoji("like")
this.hideMenu()
setTimeout(() => {
    this.props.likeit()  
    
}, 200);
          }}>
              <Image
                            style={styles.singlePostBtnIcon}
                            source={like}
                        />
          </TouchableOpacity>
<TouchableOpacity style={{marginLeft:20,marginRight:20,width:50}}  onPress={()=>{

this.props.setemoji("haha")
this.hideMenu()
setTimeout(() => {
    this.props.likeit()    
}, 200);

          }}>
              <Image
                            style={styles.singlePostBtnIcon}
                            source={haha}
                        />
          </TouchableOpacity>
          <TouchableOpacity style={{width:50}} onPress={()=>{

this.props.setemoji("wow")
this.hideMenu()
setTimeout(() => {
    this.props.likeit() 
   
}, 200);
          }}>

<Image
                            style={styles.singlePostBtnIcon}
                            source={wow}
                        />

          </TouchableOpacity>

          </View>
         
           
          <MenuDivider />
        
        </Menu>
                    </View>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.singlePostFooterBtn}  onPress={() => comment({s:true,id:id})}>
                    <View style={styles.singlePostBtnContent}>
                        <Image
                            style={styles.singlePostBtnIcon}
                            source={img2}
                        />
                    </View>
                </TouchableOpacity>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singlePostFooter: {
        height: 50,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#DDDDE4",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    singlePostFooterBtn: {
        flex: 1,
        height: 40
    },
    singlePostBtnContent: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        width:200
    },
    singlePostBtnIcon: {
        height: 20,
        width: 20
    }
});