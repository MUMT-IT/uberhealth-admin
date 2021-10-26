// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {ToastProgrammatic} from "buefy";

const firebaseConfig = {
    apiKey: "AIzaSyCy-GU37EF62Xaajdb1nAw4ImteoZncgns",
    authDomain: "uberhealth-c1541.firebaseapp.com",
    projectId: "uberhealth-c1541",
    storageBucket: "uberhealth-c1541.appspot.com",
    messagingSenderId: "115846268061",
    appId: "1:115846268061:web:ab4ddd1c3e585efa298074",
    measurementId: "G-NFBWZFHPZB"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

auth.onAuthStateChanged(user=>{
    if (user) {
        ToastProgrammatic.open({
            message: "You have logged in.",
            type: "is-success"
        })
    } else {
        ToastProgrammatic.open({
            message: "You are not logged in.",
            type: "is-danger"
        })
    }
});

export {
    storage,
    db,
    auth
}