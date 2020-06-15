import React from 'react'
import {View} from "react-native"
import { Avatar, Card, IconButton,TextInput,Button } from 'react-native-paper';
import { firestore ,auth} from '../../firebase/firebase.utils';
export default function commenit({post}) {

const [commentt,set]=React.useState({display:"",comment:""})
React.useEffect(() => {
   set({display:auth.currentUser.displayName,comment:"",img:auth.currentUser.photoURL,email:auth.currentUser.email})
}, [])
console.log(commentt)
    const handleComment = () => {
      
      
      
     

        post.comment.push(commentt)
        firestore
        .collection("Posts")
        .doc(`${post.id}`)
        .set({
      
        comment:post.comment,
       
        },{ merge: true }
       );
      }
   
    return (
        <View style={{width:"100%" ,marginTop:50,marginBottom:20}}>
    <TextInput placeholder='enter comment' value={commentt}  onChangeText={text => set({...commentt,comment:text})}/>
    <Button onPress={handleComment}>make Comment</Button>
  </View>
    )
}
