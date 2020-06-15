import * as React from 'react';
import { ActivityIndicator, View, Button, ScrollView, Modal, StyleSheet ,RefreshControl} from 'react-native'
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { firestore } from "../firebase/firebase.utils"
import { connect } from "react-redux"
import { showcomment, updateItem, additem } from '../redux/Card'
import Cards from "../components/postcard/postcard"
import Postit from "../components/postcard/postit"
import Commentcom from "../components/postcard/commenit"
import Listlike from "../components/postcard/listlike"
import CommentView from '../components/commentview/comments'
function HomeScreen({ navigation, posts, commentPost, u, update }) {
  const [loading, setloading] = React.useState(false)
  const [isComment, setFocus] = React.useState({ s: false, id: null })
  const [r, rs] = React.useState([])
 
React.useEffect(() => {
  let newarr=[...posts]
  console.log("post değştiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  
  let ar=newarr.reverse()
  rs(ar)

}, [posts])


const reflesh=()=>{
  setloading(true)
  firestore.collection("Posts")
    .get()
    .then(function (querySnapshot) {

      let Array = []



      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        Array.push(doc.data());
      });

      update(Array)
      setloading(false)

    })
}




  React.useEffect(() => {
    let a;
    setloading(true)
    firestore.collection("Posts")
      .get()
      .then(function (querySnapshot) {

        let Array = []



        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          Array.push(doc.data());
        });

        update(Array)
        setloading(false)
        
        setTimeout(() => {
          a = firestore.collection("Posts")
            .onSnapshot(function (snapshot) {

              if (snapshot.docChanges().length < 2) {

                snapshot.docChanges().forEach(function (change) {
                  console.log("change typeeeeeeeeeeeeeeee",change.type)
                
                  if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                    u({ props: change.doc.data(), type: "modified" })
                  }
                  if (change.type === "removed") {
                    u({ props: change.doc.data(), type: "removed" })
                  }
                });
                setloading(false)

              }

              
            }, function (error) {
              //...
            });
        }, 200);









      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });








    return () => {
      a()
    }
  }, [])



  const [open, setopen] = React.useState(false)
  const [postss, setPosts] = React.useState(posts)
 const [likeopen,setlikeopen]=React.useState({s:false,id:null})
  const usingItem = posts.find(item => item.id === isComment.id)
  const usingItemforlike=posts.find(item=>item.id===likeopen.id)



  return (

    <View style={{ flex: 1, }}>
      <View style={{ height: 50, backgroundColor: "white", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 }}>
        <Feather as={Button} onPress={() => navigation.openDrawer()} height={14} name="menu" size={24} color="black" />
        <Entypo name="new-message" size={24} color="black" onPress={() => setopen(true)} />
      </View>




      <Modal
        animationType="slide"
        transparent={true}
        visible={likeopen.s}

      >
          
        <View style={styles.modalView}>
          <View style={{ height: 50, width:"100%", backgroundColor: "white",  alignItems: "center", padding: 5 ,marginBottom:20}}>
           
            <MaterialIcons name="cancel" size={34} color="black" onPress={() => setlikeopen({ ...likeopen, s: false })}  style={{position:"absolute",top:3,right:3}}/>
           
          </View>
          {loading ? (<ActivityIndicator size="large"  color="#0000ff" />) : (

            <ScrollView style={{width:"100%"}} >
              <Listlike post={usingItemforlike} />
            </ScrollView>

          )}

        </View>
        
      </Modal>












      <Modal
        animationType="slide"
        transparent={true}
        visible={isComment.s}

      >
          
        <View style={styles.modalView}>
          <View style={{ height: 150, width:"100%", backgroundColor: "white",  alignItems: "center", padding: 5 ,marginBottom:20}}>
           
            <MaterialIcons name="cancel" size={34} color="black" onPress={() => setFocus({ ...isComment, s: false })}  style={{position:"absolute",top:3,right:3}}/>
            <Commentcom post={usingItem} ></Commentcom>
          </View>
          {loading ? (<ActivityIndicator size="large"  color="#0000ff" />) : (

            <ScrollView style={{width:"100%"}} >
              <CommentView post={usingItem} />
            </ScrollView>

          )}

        </View>
        
      </Modal>



      <Postit open={open} setopen={setopen}></Postit>
      {loading ? (<ActivityIndicator size="large" color="#0000ff"  style={{position:"absolute",left:200,bottom:200}}/>) : (

        <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reflesh} />
        }
        
        >
          {r&&r.map(item => <Cards
          uid={item.uid}
          setlike={setlikeopen}
          photo={item.profileimg}
          setFocus={setFocus}
            email={item.email} key={item.id} image={item.imgUrl} post={item.post} id={item.id} time={item.createdAt} name={item.name} likes={item.like} comment={item.comment}></Cards>)}
        </ScrollView>

      )}
    </View>)

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
    width: "90%",
    margin: 20,
    height: 600,
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
  posts: state.cart.cartItems,
  isComment: state.cart.commentFocus,
  commentPost: state.cart.postId,
  user:state.user.user
})
const d = dispatch => ({
  update: (payload) => dispatch(additem(payload)),
  setFocus: (payload, payload2) => dispatch(showcomment(payload, payload2)),
  u: (payload) => dispatch(updateItem(payload))
})
export default connect(s, d)(HomeScreen);