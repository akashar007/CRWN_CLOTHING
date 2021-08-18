import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAFfzSlWpjb6EmKfZQ71lRQCUMpa6xy7O0",
  authDomain: "crwn-clothing-aa99a.firebaseapp.com",
  projectId: "crwn-clothing-aa99a",
  storageBucket: "crwn-clothing-aa99a.appspot.com",
  messagingSenderId: "827992113980",
  appId: "1:827992113980:web:3b48647e04accf8a0ed439",
  measurementId: "G-MJ6X1BKRE3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
