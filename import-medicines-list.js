const admin = require('firebase-admin');
const fs = require('fs');

// ============================================================================
// SETUP INSTRUCTIONS:
// 1. Go to Firebase Console -> Project Settings -> Service Accounts
// 2. Click "Generate new private key" and download the JSON file
// 3. Rename the downloaded file to 'serviceAccountKey.json' and place it in the same folder as this script
// 4. Open terminal in this folder and run: 
//    npm install firebase-admin
//    node import-medicines-list.js
// ============================================================================

const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json';

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`\n❌ Error: Service account key not found at ${SERVICE_ACCOUNT_PATH}`);
  console.error(`Please download it from Firebase Console and place it here.\n`);
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const medicinesList = [
  // Tablets
  { name: 'D S P TAB', category: 'Tablets', stock: 20 },
  { name: 'NEWARROW-B12 FORTE', category: 'Tablets', stock: 5 },
  { name: 'NORFLOX-400 TAB', category: 'Tablets', stock: 4 },
  { name: 'NEUROBION FORTE TAB', category: 'Tablets', stock: 10 },
  { name: 'NEUROBION FORT TAB', category: 'Tablets', stock: 3 },
  { name: 'DOLOGESIC-SP TAB', category: 'Tablets', stock: 27 },
  { name: 'HEXAMENTIN-625 TAB', category: 'Tablets', stock: 4 },
  { name: 'AMOXYCLAV 625 TAB', category: 'Tablets', stock: 3 },
  { name: 'MONORIN-150 TAB', category: 'Tablets', stock: 25 },
  { name: 'MOKCAN CV 625', category: 'Tablets', stock: 2 },
  { name: 'FUNGICIP 200 TAB', category: 'Tablets', stock: 10 },
  { name: 'WICIP GOLD & FLU TAB', category: 'Tablets', stock: 20 },
  { name: 'NOVACLAV-625 TAB', category: 'Tablets', stock: 3 },
  { name: 'ORO-CV 625 TAB', category: 'Tablets', stock: 1 },
  { name: 'MUXANVUE CV 625', category: 'Tablets', stock: 1 },
  { name: 'KOLD TIME TAB', category: 'Tablets', stock: 10 },
  { name: 'DICLOGEM MR TAB', category: 'Tablets', stock: 20 },
  { name: 'FENAK PLUS TAB', category: 'Tablets', stock: 20 },
  { name: 'SEPTRAN DS TAB', category: 'Tablets', stock: 4 },
  { name: 'ONDEM MD 4 TAB', category: 'Tablets', stock: 5 },
  { name: 'BANDY PLUS TAB', category: 'Tablets', stock: 10 },
  { name: 'BRUFEN 400', category: 'Tablets', stock: 3 },
  { name: 'FLUKA-150 TAB', category: 'Tablets', stock: 3 },
  { name: 'NICIP COLD & FLU TAB', category: 'Tablets', stock: 30 },
  { name: 'VIGORE 100 TAB', category: 'Tablets', stock: 9 },
  { name: 'DEXALIFE TAB', category: 'Tablets', stock: 1 },
  { name: 'OFLOTAS-OZ TAB', category: 'Tablets', stock: 5 },
  { name: 'IBULAB TAB', category: 'Tablets', stock: 20 },
  { name: 'TRIMAZOLE-DS TAB', category: 'Tablets', stock: 9 },
  { name: 'ZEMURA-200 TAB', category: 'Tablets', stock: 10 },
  { name: 'CYPRODINE TAB 4MG', category: 'Tablets', stock: 1 },
  { name: 'DICLOGEM GREEN TAB', category: 'Tablets', stock: 40 },
  { name: 'DERIPHYLLIN TAB', category: 'Tablets', stock: 6 },
  { name: 'ASTHALIN 4 MG TAB', category: 'Tablets', stock: 6 },
  { name: 'DEXONA TAB', category: 'Tablets', stock: 30 },
  { name: 'ACILOC 300 MG TAB', category: 'Tablets', stock: 2 },
  { name: 'ENTERO QUINOL TAB', category: 'Tablets', stock: 3 },
  { name: 'METROGYL 400MG', category: 'Tablets', stock: 4 },
  { name: 'METROGYL 200MG TAB', category: 'Tablets', stock: 6 },
  { name: 'VERTIN 16 MG TAB', category: 'Tablets', stock: 2 },
  { name: 'DIGENE TAB MINT', category: 'Tablets', stock: 6 },
  { name: 'URASONE TAB', category: 'Tablets', stock: 1 },
  { name: 'DULCOFLEX TAB', category: 'Tablets', stock: 10 },
  { name: 'WYSOLONE 5MG TAB', category: 'Tablets', stock: 8 },
  { name: 'WYSOLONE 10MG TAB', category: 'Tablets', stock: 8 },
  { name: 'AMLOKIND 5 TAB', category: 'Tablets', stock: 6 },
  { name: 'NORFLUXACIN & TINIDAZOLE TAB', category: 'Tablets', stock: 4 },
  { name: 'ALMOX DT-250 TAB', category: 'Tablets', stock: 5 },
  { name: 'NICE TAMOL AP TAB', category: 'Tablets', stock: 8 },
  { name: 'NORILET-TZ TAB', category: 'Tablets', stock: 10 },
  { name: 'ETOFORD 120 TAB', category: 'Tablets', stock: 6 },
  { name: 'ULCERID TAB', category: 'Tablets', stock: 1 },
  { name: 'AZURI TAB 10TAB', category: 'Tablets', stock: 15 },

  // Capsules
  { name: 'DOXYCHL LB CAP', category: 'Capsules', stock: 4 },
  { name: 'MAXIRICH CAP', category: 'Capsules', stock: 6 },
  { name: 'CANDIFORCE 200 CAP', category: 'Capsules', stock: 6 },
  { name: 'MANFORCE 100 CAP', category: 'Capsules', stock: 1 },
  { name: 'NUROKIND GOLD CAP', category: 'Capsules', stock: 5 },
  { name: 'MECOFOL PLUS NF CAP', category: 'Capsules', stock: 10 },
  { name: 'DECOSULES CAP', category: 'Capsules', stock: 6 },
  { name: 'KUFFDRYL-D CAP', category: 'Capsules', stock: 8 },

  // Syrups
  { name: 'HEMO FORTE SYP 300ML', category: 'Syrups', stock: 3 },
  { name: 'AMPOXIN CV SUS 30ML', category: 'Syrups', stock: 10 },
  { name: 'C-ZEN PLUS SYP', category: 'Syrups', stock: 10 },
  { name: 'ALDIGESIC P+ SUS 60ML', category: 'Syrups', stock: 2 },
  { name: 'MONTULARG-LC SYP', category: 'Syrups', stock: 2 },
  { name: 'ACEFEN DS SUSPENSION', category: 'Syrups', stock: 3 },
  { name: 'ALKACITRUL SYP', category: 'Syrups', stock: 3 },
  { name: 'DEXORANGE SYRUP', category: 'Syrups', stock: 6 },
  { name: 'ALKASAL SYP', category: 'Syrups', stock: 2 },
  { name: 'HEPATOGLOBINE SYRUP 300ML', category: 'Syrups', stock: 2 },
  { name: 'MAGNAKUF-DX SYP', category: 'Syrups', stock: 4 },
  { name: 'TUSSCODINE-DX SYP', category: 'Syrups', stock: 5 },
  { name: 'TUSSOL BR SYP', category: 'Syrups', stock: 10 },
  { name: 'TUSSOL DRYL SYP', category: 'Syrups', stock: 10 },
  { name: 'FERCEE RED SYP', category: 'Syrups', stock: 2 },
  { name: 'OFLOX OZ SYP', category: 'Syrups', stock: 5 },
  { name: 'NICETAMUL MF SYP', category: 'Syrups', stock: 2 },
  { name: 'DRS MEDWIN', category: 'Syrups', stock: 8 },
  { name: 'MEDSETRON SYRUP', category: 'Syrups', stock: 5 },
  { name: 'DEF-M SUSPENSION', category: 'Syrups', stock: 5 },
  { name: 'SAFI 100ML', category: 'Syrups', stock: 1 },
  { name: 'SAFI 200ML', category: 'Syrups', stock: 2 },

  // Creams/Gels/Sprays
  { name: 'CLUBETA GM GREEN 10GM', category: 'Creams/Gels/Sprays', stock: 6 },
  { name: 'DULUKIND STRONG GEL 30G', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'SUMO GEL 30GM', category: 'Creams/Gels/Sprays', stock: 4 },
  { name: 'LULITEC CREAM 30GM', category: 'Creams/Gels/Sprays', stock: 4 },
  { name: 'ACNESTAR GEL', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'BETNOVATE C OINT', category: 'Creams/Gels/Sprays', stock: 6 },
  { name: 'VOLINI GEL 12GM', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'DOLO PAIN RELIEF SPRAY', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'OMNIGEL SPRAY 55GM', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'OMNIGEL SPRAY 35GM', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'VOLINI SPRAY 15GM', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'MOOV 10GM', category: 'Creams/Gels/Sprays', stock: 4 },
  { name: 'MOOV SPRAY 15GM', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'MOOV SPRAY 35GM', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'OMNIGEL 20GM', category: 'Creams/Gels/Sprays', stock: 3 },
  { name: 'VICKS 5GM', category: 'Creams/Gels/Sprays', stock: 15 },
  { name: 'VICKS 12GM', category: 'Creams/Gels/Sprays', stock: 5 },
  { name: 'ZANDU BALM 8M', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'ZANDU BALM ULTRA 8M', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'TIGER BALM', category: 'Creams/Gels/Sprays', stock: 1 },
  { name: 'SANGAM OIL', category: 'Creams/Gels/Sprays', stock: 6 },
  { name: 'TIGER KING', category: 'Creams/Gels/Sprays', stock: 2 },
  { name: 'CLOP G CREAM', category: 'Creams/Gels/Sprays', stock: 4 },

  // Powders
  { name: 'ELECTROL POW ORANGE 4.4GM', category: 'Powders', stock: 50 },
  { name: 'K-MEDICO ORS POWDER', category: 'Powders', stock: 50 },
  { name: 'GASOFAST', category: 'Powders', stock: 20 },
  { name: 'G.C 100GM', category: 'Powders', stock: 4 },
  { name: 'G.C 200GM', category: 'Powders', stock: 2 },
  { name: 'ELECTRAL POWDER', category: 'Powders', stock: 31 },
  { name: 'ISABGOL 100GM', category: 'Powders', stock: 1 },

  // Injections
  { name: 'OXYTETRACYCLINE INJ 30ML', category: 'Injections', stock: 3 },
  { name: 'NUROKIND GOLD INJ', category: 'Injections', stock: 3 },
  { name: 'NEUROBION FORT AMP', category: 'Injections', stock: 2 },
  { name: 'CALVIT-12 INJ', category: 'Injections', stock: 2 },
  { name: 'TRINEUROSOL-H INJ', category: 'Injections', stock: 2 },
  { name: 'VITCOFOL VIAL', category: 'Injections', stock: 3 },
  { name: 'MAGENTA 20ML INJ', category: 'Injections', stock: 10 },
  { name: 'MERIDECA INJ 20ML', category: 'Injections', stock: 5 },
  { name: 'T.T BETT INJ', category: 'Injections', stock: 20 },
  { name: 'ALMOX 250 INJ', category: 'Injections', stock: 20 },
  { name: 'DEXASONE INJ 2ML', category: 'Injections', stock: 12 },

  // Others
  { name: 'VICKS JAR', category: 'Others', stock: 1 },
  { name: 'UNWANTED KIT', category: 'Others', stock: 2 },
  { name: 'CUPID CHOCOLATE CONDOM', category: 'Others', stock: 10 },
  { name: 'CUPID SUPER DOTTED CONDOM', category: 'Others', stock: 5 },
  { name: 'PREGANIURTH CARD', category: 'Others', stock: 10 }
];

async function importMedicines() {
  const collectionRef = db.collection('medicines');
  let newCount = 0;
  let updateCount = 0;

  for (const med of medicinesList) {
    const querySnapshot = await collectionRef.where('name', '==', med.name).limit(1).get();

    if (querySnapshot.empty) {
      // Create new
      await collectionRef.add({
        name: med.name,
        category: med.category,
        stock: med.stock,
        price: 0,
        company: 'Unknown',
        prescriptionRequired: false,
        description: '',
        inStock: med.stock > 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Added: ${med.name}`);
      newCount++;
    } else {
      // Update existing stock
      const doc = querySnapshot.docs[0];
      const existingStock = doc.data().stock || 0;
      const newStock = existingStock + med.stock;
      
      await doc.ref.update({
        stock: newStock,
        inStock: newStock > 0,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Updated stock for: ${med.name} (Added: ${med.stock} -> New Total: ${newStock})`);
      updateCount++;
    }
  }

  console.log(`\n🎉 Success! Added ${newCount} new medicines and updated ${updateCount} existing medicines.\n`);
}

importMedicines().catch(console.error);
