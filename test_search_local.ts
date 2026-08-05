import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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
    const q = query(
      collection(db, 'medicines'),
      orderBy('name'),
      limit(1000)
    );
    const snapshot = await getDocs(q);
    const dbMedicines = snapshot.docs.map(doc => doc.data());
    console.log(`Fetched ${dbMedicines.length} ordered by name`);
};

test().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
