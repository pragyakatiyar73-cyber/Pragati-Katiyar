import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { inventoryMedicines } from "./src/lib/importMedicines";

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

const run = async () => {
    try {
        const medicinesRef = collection(db, 'medicines');
        const snapshot = await getDocs(medicinesRef);
        const existingNames = new Set(snapshot.docs.map(doc => doc.data().name?.toLowerCase().trim()));
        let batch = writeBatch(db);
        let count = 0;
        
        for (const medicine of inventoryMedicines) {
          if (!existingNames.has(medicine.name.toLowerCase().trim())) {
            const docRef = doc(medicinesRef);
            batch.set(docRef, {
              ...medicine,
              createdAt: serverTimestamp()
            });
            count++;
            
            if (count % 400 === 0) {
              await batch.commit();
              batch = writeBatch(db);
            }
          }
        }
        
        if (count % 400 !== 0) {
          await batch.commit();
        }
        console.log(`Successfully imported ${count} new medicines!`);
      } catch (error) {
        console.error("Error seeding medicines: ", error);
      }
};

run().then(() => process.exit(0)).catch(() => process.exit(1));
