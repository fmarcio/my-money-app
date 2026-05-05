import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg-4K8DnojkkYRO48wmE8tB0a_kJgWKd8",
  authDomain: "mymoney-ee086.firebaseapp.com",
  projectId: "mymoney-ee086",
  storageBucket: "mymoney-ee086.appspot.com",
  messagingSenderId: "588317924664",
  appId: "1:588317924664:web:b8cca927f1b73bdfcef5cd",
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);

const timestamp = Timestamp;

export { projectFirestore, projectAuth, timestamp };
