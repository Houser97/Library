// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js"
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

let user = '';

/* Save books in database */
export const saveBook = (author, title, NumPages, isRead) => {
    console.log(user);
    if(user !== ''){
    addDoc(collection(db, `library ${user}`), {author, title, NumPages, isRead});
    } else {
        addDoc(collection(db, `library`), {author, title, NumPages, isRead});
    }
}


/* Retrieve book's information */
export const getBooks = () => {
    /*console.log(user);*/
    if(user !== ''){
       return getDocs(collection(db, `library ${user}`));
    } else {
       return getDocs(collection(db, `library`));
    }
}

/* Authentication */
export const signIn = async () => {
    let provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    })
    await signInWithPopup(getAuth(), provider).then(userD => user = userD.user.uid);
}

// Signs-out of Friendly Chat.
export function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    user = "";
}


/* Get user photo */
export const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL;
}

/* Get user name */
export const getUserName = () => {
    return getAuth().currentUser.displayName;
}

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8exFG0JbhICV8xOhWQ4Odt5kDxUsFLVc",
    authDomain: "library-c1ad3.firebaseapp.com",
    projectId: "library-c1ad3",
    storageBucket: "library-c1ad3.appspot.com",
    messagingSenderId: "286409120187",
    appId: "1:286409120187:web:e72f4ccbc3ae2bc7d9cc9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
