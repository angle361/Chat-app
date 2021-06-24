import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCEeQX42nQ0rXDZrV4MOQMdAP_AuheeTC4",
    authDomain: "chat-app-8024f.firebaseapp.com",
    projectId: "chat-app-8024f",
    storageBucket: "chat-app-8024f.appspot.com",
    messagingSenderId: "715309602097",
    appId: "1:715309602097:web:a17f4fce9dc72fc93d4c10",
    measurementId: "G-V8Y5J5LLVZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{ auth, provider };
export default db;