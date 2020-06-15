import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyADJOU_HbRQelQjAocGcABxlVPkLz-EIgQ",
    authDomain: "facebookclone-6aeab.firebaseapp.com",
    databaseURL: "https://facebookclone-6aeab.firebaseio.com",
    projectId: "facebookclone-6aeab",
    storageBucket: "facebookclone-6aeab.appspot.com",
    messagingSenderId: "437891912523",
    appId: "1:437891912523:web:319a87e7fbc925f2820ece",
    measurementId: "G-17GFFBL95D"
  };
  firebase.initializeApp(firebaseConfig);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
    console.log(snapShot)
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user');
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  
  export default firebase;