// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js"
import { } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"


/* Authentication */
export async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
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
