// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAopeAo2SsdeUNDCYoSrow7p0eS8KyqbF0",
  authDomain: "w6-24-react-dav-kiran-machine.firebaseapp.com",
  projectId: "w6-24-react-dav-kiran-machine",
  storageBucket: "w6-24-react-dav-kiran-machine.appspot.com",
  messagingSenderId: "850292240328",
  appId: "1:850292240328:web:3b6e5655fb92ea57d71afd",
  measurementId: "G-6LFN8HKWJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export{db, storage, auth}