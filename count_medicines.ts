import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVIlBSxwn0xEbv9MSW-ms_kNXAlipR8vA",
  authDomain: "katiyar-medical-store.firebaseapp.com",
  projectId: "katiyar-medical-store",
  storageBucket: "katiyar-medical-store.firebasestorage.app",
  messagingSenderId: "635886051847",
  appId: "1:635886051847:web:e5d4df3e9df63d016e80a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const count = async () => {
    const snapshot = await getDocs(collection(db, 'medicines'));
    console.log(`Total medicines in Firestore: ${snapshot.size}`);
};

count().then(() => process.exit(0)).catch(() => process.exit(1));
