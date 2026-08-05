import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

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

const test = async () => {
    const snapshot = await getDocs(collection(db, 'medicines'));
    const meds = snapshot.docs.map(doc => doc.data());
    const matches = meds.filter(m => m.name && m.name.toLowerCase().includes('ulcerid'));
    console.log(`Found ${matches.length} matches for ULCERID:`);
    console.log(matches);
};

test().then(() => process.exit(0)).catch(() => process.exit(1));
