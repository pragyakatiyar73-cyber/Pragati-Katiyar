import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVIlBSxwn0xEbv9MSW-ms_kNXAlipR8vA",
  authDomain: "katiyar-medical-store.firebaseapp.com",
  projectId: "katiyar-medical-store",
  storageBucket: "katiyar-medical-store.firebasestorage.app",
  messagingSenderId: "635886051847",
  appId: "1:635886051847:web:e5d4df3e9df63d016e80a2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
