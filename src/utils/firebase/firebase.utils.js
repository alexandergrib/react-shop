import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqKV0B-nOv__0nhB3KZfgD9ep5GxQGgYA",
  authDomain: "react-shop-db-ee139.firebaseapp.com",
  projectId: "react-shop-db-ee139",
  storageBucket: "react-shop-db-ee139.appspot.com",
  messagingSenderId: "323568078568",
  appId: "1:323568078568:web:a95c1bb3035c7b4b11435d"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const  signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export  const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)
    const userSnapshot =  await getDoc(userDocRef);
    console.log(userSnapshot)
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef,  {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async  (email, password) => {
    if(!email || !password ) return;

    return await createUserWithEmailAndPassword(auth, email, password );
};
export const signInAuthUserWithEmailAndPassword = async  (email, password) => {
    if(!email || !password ) return;

    return await signInAuthUserWithEmailAndPassword(auth, email, password );
};
