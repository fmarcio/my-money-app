import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg-4K8DnojkkYRO48wmE8tB0a_kJgWKd8",
  authDomain: "mymoney-ee086.firebaseapp.com",
  projectId: "mymoney-ee086",
  storageBucket: "mymoney-ee086.appspot.com",
  messagingSenderId: "588317924664",
  appId: "1:588317924664:web:b8cca927f1b73bdfcef5cd",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
