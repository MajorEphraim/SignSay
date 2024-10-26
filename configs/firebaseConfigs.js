import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, where, query, addDoc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDHgLYh0S6QQkRiaxvFaPsTeqlVDAof4wQ",
  authDomain: "signsay-f4969.firebaseapp.com",
  projectId: "signsay-f4969",
  storageBucket: "signsay-f4969.appspot.com",
  messagingSenderId: "209305958500",
  appId: "1:209305958500:web:36a45040ee65cb14024771"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {collection, getDocs, db, where, query,addDoc, getStorage, ref, getDownloadURL, uploadBytes} 

