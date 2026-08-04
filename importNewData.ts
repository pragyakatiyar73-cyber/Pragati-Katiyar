import { writeBatch, collection, doc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './src/lib/firebase.ts';

const list = [
  { name: 'FLUKA-150 TAB', category: 'Tablets & Capsules' },
  { name: 'MAXIRICH CAP', category: 'Tablets & Capsules' },
  { name: 'NICIP COLD & FLU TAB', category: 'Tablets & Capsules' },
  { name: 'VIGORE 100 TAB', category: 'Tablets & Capsules' },
  { name: 'DEXALIFE TAB', category: 'Tablets & Capsules' },
  { name: 'MECOFOL PLUS NF CAP', category: 'Tablets & Capsules' },
  { name: 'OFLOTAS-OZ TAB', category: 'Tablets & Capsules' },
  { name: 'FENAK PLUS TAB', category: 'Tablets & Capsules' },
  { name: 'IBULAB TAB', category: 'Tablets & Capsules' },
  { name: 'TRIMAZOLE-DS TAB', category: 'Tablets & Capsules' },
  { name: 'ZEMURA-200 TAB', category: 'Tablets & Capsules' },
  { name: 'CYPRODINE TAB 4MG', category: 'Tablets & Capsules' },
  { name: 'DICLOGEM GREEN TAB', category: 'Tablets & Capsules' },
  { name: 'DICLOGEM MR TAB', category: 'Tablets & Capsules' },
  { name: 'DERIPHYLLIN TAB', category: 'Tablets & Capsules' },
  { name: 'ASTHALIN 4 MG TAB', category: 'Tablets & Capsules' },
  { name: 'DEXONA TAB', category: 'Tablets & Capsules' },
  { name: 'NEUROBION FORTE TAB', category: 'Tablets & Capsules' },
  { name: 'ACILOC 300 MG TAB', category: 'Tablets & Capsules' },
  { name: 'ENTERO QUINOL TAB', category: 'Tablets & Capsules' },
  { name: 'METROGYL 400MG TAB', category: 'Tablets & Capsules' },
  { name: 'METROGYL 200MG TAB', category: 'Tablets & Capsules' },
  { name: 'D S P TAB', category: 'Tablets' },
  { name: 'NEWARROW-B12 FORTE', category: 'Tablets' },
  { name: 'NORFLOX-400 TAB', category: 'Tablets' },
  { name: 'NEUROBION FORT TAB', category: 'Tablets' },
  { name: 'DOLOGESIC-SP TAB', category: 'Tablets' },
  { name: 'HEXAMENTIN-625 TAB', category: 'Tablets' },
  { name: 'AMOXYCLAV 625 TAB', category: 'Tablets' },
  { name: 'MONORIN-150 TAB', category: 'Tablets' },
  { name: 'MOKCAN CV 625', category: 'Tablets' },
  { name: 'FUNGICIP 200 TAB', category: 'Tablets' },
  { name: 'WICIP GOLD & FLU TAB', category: 'Tablets' },
  { name: 'NOVACLAV-625 TAB', category: 'Tablets' },
  { name: 'ORO-CV 625 TAB', category: 'Tablets' },
  { name: 'MUXANVUE CV 625', category: 'Tablets' },
  { name: 'KOLD TIME TAB', category: 'Tablets' },
  { name: 'SEPTRAN DS TAB', category: 'Tablets' },
  { name: 'ONDEM MD 4 TAB', category: 'Tablets' },
  { name: 'BANDY PLUS TAB', category: 'Tablets' },
  { name: 'BRUFEN 400', category: 'Tablets' },
  { name: 'DOXYCHL LB CAP', category: 'Capsules' },
  { name: 'CANDIFORCE 200 CAP', category: 'Capsules' },
  { name: 'MANFORCE 100 CAP', category: 'Capsules' },
  { name: 'NUROKIND GOLD CAP', category: 'Capsules' },
  { name: 'HEMO FORTE SYP', category: 'Syrups / Suspensions' },
  { name: 'AMPOXIN CV SUS', category: 'Syrups / Suspensions' },
  { name: 'C-ZEN PLUS SYP', category: 'Syrups / Suspensions' },
  { name: 'ALDIGESIC P+ SUS', category: 'Syrups / Suspensions' },
  { name: 'MONTULARG-LC SYP', category: 'Syrups / Suspensions' },
  { name: 'ACEFEN DS SUSPENSION', category: 'Syrups / Suspensions' },
  { name: 'ALKACITRUL SYP', category: 'Syrups / Suspensions' },
  { name: 'DEXORANGE SYRUP', category: 'Syrups / Suspensions' },
  { name: 'ALKASAL SYP', category: 'Syrups / Suspensions' },
  { name: 'HEPATOGLOBINE SYRUP', category: 'Syrups / Suspensions' },
  { name: 'ELECTROL POW ORANGE', category: 'Powders / ORS' },
  { name: 'K-MEDICO ORS POWDER', category: 'Powders / ORS' },
  { name: 'CLUBETA GM GREEN', category: 'Creams / Gels / Ointments' },
  { name: 'DULUKIND STRONG GEL', category: 'Creams / Gels / Ointments' },
  { name: 'SUMO GEL', category: 'Creams / Gels / Ointments' },
  { name: 'LULITEC CREAM', category: 'Creams / Gels / Ointments' },
  { name: 'ACNESTAR GEL', category: 'Creams / Gels / Ointments' },
  { name: 'BETNOVATE C OINT', category: 'Creams / Gels / Ointments' },
  { name: 'VOLINI GEL', category: 'Creams / Gels / Ointments' },
  { name: 'DOLO PAIN RELIEF SPRAY', category: 'Sprays' },
  { name: 'OMNIGEL SPRAY 55GM', category: 'Sprays' },
  { name: 'OMNIGEL SPRAY 35GM', category: 'Sprays' },
  { name: 'VOLINI SPRAY 15GM', category: 'Sprays' },
  { name: 'OXYTETRACYCLINE INJ', category: 'Injections / Ampoules' },
  { name: 'NUROKIND GOLD INJ', category: 'Injections / Ampoules' },
  { name: 'NEUROBION FORT AMP', category: 'Injections / Ampoules' },
  { name: 'VICKS JAR', category: 'Others' },
  { name: 'UNWANTED KIT', category: 'Others' }
];

async function run() {
  const collectionRef = collection(db, 'medicines');
  const existingDocs = await getDocs(collectionRef);
  const existingNames = new Set(existingDocs.docs.map(d => d.data().name?.trim().toLowerCase()));

  const uniqueList = Array.from(new Map(list.map(m => [m.name.replace(/\s*\([^)]*\)\s*/g, '').replace(/\s*\d+(ML|GM)\s*/i, '').trim().toLowerCase(), m])).values());

  console.log(`Total items in raw list: ${list.length}`);
  console.log(`Total unique items: ${uniqueList.length}`);
  console.log(`Existing items in firestore: ${existingDocs.docs.length}`);
  
  let batch = writeBatch(db);
  let count = 0;
  let added = 0;

  for (const med of uniqueList) {
    const cleanName = med.name.replace(/\s*\([^)]*\)\s*/g, '').replace(/\s*\d+(ML|GM)\s*/i, '').trim();
    if (!existingNames.has(cleanName.toLowerCase())) {
      const docRef = doc(collectionRef);
      batch.set(docRef, {
        name: cleanName,
        category: med.category,
        manufacturer: '',
        price: 0,
        inStock: true,
        stock: 100,
        description: '',
        createdAt: serverTimestamp()
      });
      count++;
      added++;
      
      if (count >= 500) {
        await batch.commit();
        batch = writeBatch(db);
        count = 0;
      }
    }
  }

  if (count > 0) {
    await batch.commit();
  }
  
  console.log(`Imported ${added} new medicines.`);
}

run().catch(console.error);
