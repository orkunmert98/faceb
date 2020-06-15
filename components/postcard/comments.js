import React, { Component } from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import {Caption} from "react-native-paper"
import likess from "../../assets/img/like.png"
import hahass from "../../assets/img/haha.png"
import wowss from "../../assets/img/wow.png"
const Comment =({likes,id,likeCount,setlike,commentCount})=> {

const [like,setl]=React.useState(false)
const [haha,seth]=React.useState(false)
const [wow,setw]=React.useState(false)
React.useEffect(() => {
  console.log("girdiiiiiiiiiiiiiiiiiiiiiiiiii")
    
setl(false)
seth(false)
setw(false)

    likes&&likes.map(item=>{
    console.log("em",item.emoji)
        if(item.emoji==="like"){
    console.log("why")
        setl(true)
    }


    if(item.emoji==="wow"){
        setw(true)
        }
        if(item.emoji==="haha"){
            seth(true)
            }
    
    })
}, [likes])

    
console.log(like)

console.log(wow)

        return (
            <View style={styles.singlePostReactContainer}>
                <TouchableOpacity onPress={()=>setlike({s:true,id:id})} style={styles.singlePostReact}>
              
              {likeCount>0&&like&& <Image style={styles.singlePostReactIcon} source={likess} />}
              {likeCount>0&&haha&& <Image style={styles.singlePostReactIcon} source={hahass} />}
              {likeCount>0&&wow&&  <Image style={styles.singlePostReactIcon} source={wowss} />}
                    
                   
                    <Caption style={styles.singlePostLikeCount}>
                        {likeCount}
                    </Caption>
                </TouchableOpacity>
                <View style={styles.singlePostCommentsCount}>
                    <Caption>{commentCount}</Caption>
                </View>
            </View>
        );
    
}

const styles = StyleSheet.create({
    singlePostReactContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20,
        margin: 10
    },
    singlePostReact: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5
    },
    singlePostReactIcon: {
        height: 18,
        width: 18,
        borderRadius: 25
    },
    singlePostLikeCount: {
        paddingLeft: 3,
        paddingTop: 2
    },
    singlePostCommentsCount: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginRight: 10,
        marginTop: 5
    }
});
export default Comment