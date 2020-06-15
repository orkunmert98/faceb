import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Title, Subheading, Caption, Paragraph, Button } from 'react-native-paper';
import { Avatar, Card, IconButton, TextInput } from 'react-native-paper';
import profile from "../../assets/profil.png"
import ImageViewer from 'react-native-image-zoom-viewer';
import GallerySwiper from "react-native-gallery-swiper";
import Header from "./imageHeader"
import Footer from "./imagef"
import ImageView from "react-native-image-viewing";
import { connect } from "react-redux"
import moment from "moment"
import { firestore, auth } from '../../firebase/firebase.utils';
import { showcomment } from '../../redux/Card'
import Footers from "./cardFooter"
import prof from "../../assets/profil.png"
import Comment from "./comments"
import StatusHeader from "./postheader"



function App({ name, time, image, id, email, user, post, likes, comment, setFocus, photo, setlike ,uid}) {

  const windowWidth = Dimensions.get('window').width;

  const [imagess, setimages] = React.useState([])
  const [likess, setLikes] = React.useState(likes)
  const [commentt, setComment] = React.useState(comment)
  const [existingMail, set] = React.useState(false)
  const [emoji, setemoji] = React.useState("like")
  const [p, sp] = React.useState(null)




  React.useEffect(() => {
    firestore.collection("users").doc(uid)
    .onSnapshot(function(doc) {
        //...
        if (doc.exists) {
          console.log("doxxxxxx",doc.data())
     sp(doc.data().photoURL)
        } 
    }, function(error) {
        //...
    });








    setLikes(likes)

    const newimg = []

    image.map(item =>
      newimg.push({
        uri: item,
      })
    )
    likess.map(emailUser => {



      if (email === emailUser.email) {
        console.log("VARRRR")


        set(true);
      }

    })



    setimages(newimg)
  }, [uid])



  const likeIt = async () => {
    const { imgUrl, email, displayName } = auth.currentUser


    likess.map(emailUser => {



      if (email === emailUser.email) {
        console.log("VARRRR")


        set(true);
      }

    })

      console.log("neyyyyyyyyyyyyy", existingMail)

      if (!existingMail) {
        const newlikes = likess
        const newUser = {
          email: email,
          imgUrl: imgUrl ? imgUrl : null,
          displayName: displayName,
emoji:emoji

        }
        newlikes.push(newUser)
        setLikes(newlikes)
        set(true)
        firestore
          .collection("Posts")
          .doc(`${id}`)
          .set({
            like: newlikes,
          }, { merge: true }
          );



      } else {

        const newArray = likess.filter(item => item.email !== email)
        console.log("begeni geri alındı", newArray)

        setLikes(newArray)
        set(false)
        firestore
          .collection("Posts")
          .doc(`${id}`)
          .set({
            like: newArray,
          }, { merge: true }
          )


        }
      }





      const handleChange = event => {
        console.log(event)
        const textcomment =
        {
          name: user.email,
          comment: event.nativeEvent.text
        }
        setComment([...commentt, textcomment])
      }
      const handleComment = () => {



        firestore
          .collection("Posts")
          .doc(`${id}`)
          .set({
            like: likes,
            comment: commentt,
            name: name,
            post: post,
            imgUrl: image,
            id: id,
            createdAt: id
            , email: email
          }
          );
      }

      const del = () => {
        firestore.collection("Posts").doc(`${id}`).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });



      }

      const [visible, setIsVisible] = React.useState(false);
console.log("ppppppppppppppppppppppp",p)
      return (
        (imagess ? (
          <View style={{ width: "100%", backgroundColor: "white", marginTop: 40 }}>

            <StatusHeader
              del={del}
em="bugra123@gmail.com"
              id={email}
              name={name}
              postTime={moment(time).fromNow()}
              peopleImg={p}
              componentId={id}
            />
            <Subheading style={{ padding: 10 }}>{post}</Subheading>

            {imagess.length ? (
              <TouchableOpacity onPress={() => setIsVisible(true)} style={{ height: windowWidth * 3 / 4 }}>

                <Image source={{ uri: imagess[0].uri }} style={{ width: windowWidth, height: windowWidth * 3 / 4 }} onPress={() => console.log("n")}></Image>

                <ImageView

                  images={imagess}
                  imageIndex={0}
                  visible={visible}
                  onRequestClose={() => setIsVisible(false)}

                  FooterComponent={({ imageIndex }) => (
                    <Footer imageIndex={imageIndex} imagesCount={imagess.length} />
                  )}
                />

              </TouchableOpacity>


            ) : (null)}






            <Comment
              setlike={setlike}
              id={id}
              likes={likes}
              likeCount={likes?likes.length:0}
              commentCount={`${comment?comment.length:0} comment`}
            />
            <Footers likeit={likeIt} comment={setFocus} allow={existingMail} setemoji={setemoji} id={id}></Footers>


          </View>

        ) : (<ActivityIndicator size="large" color="#0000ff" />)

        )


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
    export default connect(s)(React.memo(App));