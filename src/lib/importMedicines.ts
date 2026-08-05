import { collection, doc, writeBatch, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const rawMedicines = [
  // Tablets
  { id: 1, name: "D S P TAB", category: "Tablets", quantity: 20 },
  { id: 2, name: "NEWARROW-B12 FORTE", category: "Tablets", quantity: 5 },
  { id: 3, name: "NORFLOX-400 TAB", category: "Tablets", quantity: 4 },
  { id: 4, name: "NEUROBION FORTE TAB", category: "Tablets", quantity: 10 },
  { id: 5, name: "NEUROBION FORT TAB", category: "Tablets", quantity: 3 },
  { id: 6, name: "DOLOGESIC-SP TAB", category: "Tablets", quantity: 27 },
  { id: 7, name: "HEXAMENTIN-625 TAB", category: "Tablets", quantity: 4 },
  { id: 8, name: "AMOXYCLAV 625 TAB", category: "Tablets", quantity: 3 },
  { id: 9, name: "MONORIN-150 TAB", category: "Tablets", quantity: 25 },
  { id: 10, name: "MOKCAN CV 625", category: "Tablets", quantity: 2 },
  { id: 11, name: "FUNGICIP 200 TAB", category: "Tablets", quantity: 10 },
  { id: 12, name: "WICIP GOLD & FLU TAB", category: "Tablets", quantity: 20 },
  { id: 13, name: "NOVACLAV-625 TAB", category: "Tablets", quantity: 3 },
  { id: 14, name: "ORO-CV 625 TAB", category: "Tablets", quantity: 1 },
  { id: 15, name: "MUXANVUE CV 625", category: "Tablets", quantity: 1 },
  { id: 16, name: "KOLD TIME TAB", category: "Tablets", quantity: 10 },
  { id: 17, name: "DICLOGEM MR TAB", category: "Tablets", quantity: 20 },
  { id: 18, name: "FENAK PLUS TAB", category: "Tablets", quantity: 20 },
  { id: 19, name: "SEPTRAN DS TAB", category: "Tablets", quantity: 4 },
  { id: 20, name: "ONDEM MD 4 TAB", category: "Tablets", quantity: 5 },
  { id: 21, name: "BANDY PLUS TAB", category: "Tablets", quantity: 10 },
  { id: 22, name: "BRUFEN 400", category: "Tablets", quantity: 3 },

  // Capsules
  { id: 23, name: "DOXYCHL LB CAP", category: "Capsules", quantity: 4 },
  { id: 24, name: "MAXIRICH CAP", category: "Capsules", quantity: 3 },
  { id: 25, name: "CANDIFORCE 200 CAP", category: "Capsules", quantity: 6 },
  { id: 26, name: "MANFORCE 100 CAP", category: "Capsules", quantity: 1 },
  { id: 27, name: "NUROKIND GOLD CAP", category: "Capsules", quantity: 5 },

  // Syrups / Suspensions
  { id: 28, name: "HEMO FORTE SYP 300ML", category: "Syrups / Suspensions", quantity: 3 },
  { id: 29, name: "AMPOXIN CV SUS 30ML", category: "Syrups / Suspensions", quantity: 6 },
  { id: 30, name: "C-ZEN PLUS SYP", category: "Syrups / Suspensions", quantity: 6 },
  { id: 31, name: "ALDIGESIC P+ SUS 60ML", category: "Syrups / Suspensions", quantity: 2 },
  { id: 32, name: "MONTULARG-LC SYP", category: "Syrups / Suspensions", quantity: 2 },
  { id: 33, name: "ACEFEN DS SUSPENSION", category: "Syrups / Suspensions", quantity: 3 },
  { id: 34, name: "ALKACITRUL SYP", category: "Syrups / Suspensions", quantity: 3 },
  { id: 35, name: "DEXORANGE SYRUP", category: "Syrups / Suspensions", quantity: 4 },
  { id: 36, name: "ALKASAL SYP", category: "Syrups / Suspensions", quantity: 2 },
  { id: 37, name: "HEPATOGLOBINE SYRUP 300ML", category: "Syrups / Suspensions", quantity: 2 },

  // Powders / ORS
  { id: 38, name: "ELECTROL POW ORANGE 4.4GM", category: "Powders / ORS", quantity: 50 },
  { id: 39, name: "K-MEDICO ORS POWDER", category: "Powders / ORS", quantity: 50 },

  // Creams / Gels / Ointments
  { id: 40, name: "CLUBETA GM GREEN 10GM", category: "Creams / Gels / Ointments", quantity: 6 },
  { id: 41, name: "DULUKIND STRONG GEL 30G", category: "Creams / Gels / Ointments", quantity: 2 },
  { id: 42, name: "SUMO GEL 30GM", category: "Creams / Gels / Ointments", quantity: 4 },
  { id: 43, name: "LULITEC CREAM 30GM", category: "Creams / Gels / Ointments", quantity: 3 },
  { id: 44, name: "ACNESTAR GEL", category: "Creams / Gels / Ointments", quantity: 1 },
  { id: 45, name: "BETNOVATE C OINT", category: "Creams / Gels / Ointments", quantity: 6 },
  { id: 46, name: "VOLINI GEL 12GM", category: "Creams / Gels / Ointments", quantity: 2 },

  // Sprays
  { id: 47, name: "DOLO PAIN RELIEF SPRAY", category: "Sprays", quantity: 1 },
  { id: 48, name: "OMNIGEL SPRAY 55GM", category: "Sprays", quantity: 2 },
  { id: 49, name: "OMNIGEL SPRAY 35GM", category: "Sprays", quantity: 2 },
  { id: 50, name: "VOLINI SPRAY 15GM", category: "Sprays", quantity: 1 },

  // Injections / Ampoules
  { id: 51, name: "OXYTETRACYCLINE INJ 30ML", category: "Injections / Ampoules", quantity: 3 },
  { id: 52, name: "NUROKIND GOLD INJ", category: "Injections / Ampoules", quantity: 2.5 },
  { id: 53, name: "NEUROBION FORT AMP", category: "Injections / Ampoules", quantity: 2 },

  // Others
  { id: 54, name: "VICKS JAR", category: "Others", quantity: 1 },
  { id: 55, name: "UNWANTED KIT", category: "Others", quantity: 2 },

  // Newly Added Medicines
  { id: 56, name: "DABUR JAMUN NEEM KAR", category: "Syrups / Suspensions", quantity: 1 },
  { id: 57, name: "AMPOXIN CV SUS 30ML", category: "Syrups / Suspensions", quantity: 10 },
  { id: 58, name: "MOXI EYE DROP 10ML", category: "Drops", quantity: 6 },
  { id: 59, name: "EARWEL EAR DROP 5ML", category: "Drops", quantity: 2 },
  { id: 60, name: "MAGNAKUF-DX SYP", category: "Syrups / Suspensions", quantity: 4 },
  { id: 61, name: "TUSSCODINE-DX SYP", category: "Syrups / Suspensions", quantity: 5 },
  { id: 62, name: "DEXORANGE SYP", category: "Syrups / Suspensions", quantity: 6 },
  { id: 63, name: "HEPTOGLOBINE SYP", category: "Syrups / Suspensions", quantity: 2 },
  { id: 64, name: "C-ZEN PLUS SYP", category: "Syrups / Suspensions", quantity: 10 },
  { id: 65, name: "DEXORANGE SYRUP", category: "Syrups / Suspensions", quantity: 4 },
  { id: 66, name: "DULUKUFF DS SUSPENSION", category: "Syrups / Suspensions", quantity: 6 },
  { id: 67, name: "TUSSOL BR SYP", category: "Syrups / Suspensions", quantity: 10 },
  { id: 68, name: "TUSSOL DRYL SYP", category: "Syrups / Suspensions", quantity: 10 },
  { id: 69, name: "FERCEE RED SYP", category: "Syrups / Suspensions", quantity: 2 },
  { id: 70, name: "OFLOX OZ SYP", category: "Syrups / Suspensions", quantity: 5 },
  { id: 71, name: "NICETAMUL MF SYP", category: "Syrups / Suspensions", quantity: 2 },
  { id: 72, name: "DRS MEDWIN", category: "Others", quantity: 8 },
  { id: 73, name: "MEDSETRON SYRUP", category: "Syrups / Suspensions", quantity: 5 },
  { id: 74, name: "DEF-M SUSPENSION", category: "Syrups / Suspensions", quantity: 5 },
  { id: 75, name: "FLUKA-150 TAB", category: "Tablets", quantity: 3 },
  { id: 76, name: "NICIP COLD & FLU TAB", category: "Tablets", quantity: 30 },
  { id: 77, name: "VIGORE 100 TAB", category: "Tablets", quantity: 9 },
  { id: 78, name: "DEXALIFE-TAB", category: "Tablets", quantity: 1 },
  { id: 79, name: "OFLOTAS-OZ TAB", category: "Tablets", quantity: 5 },
  { id: 80, name: "FENAK PLUS TAB", category: "Tablets", quantity: 20 },
  { id: 81, name: "IBULAB TAB", category: "Tablets", quantity: 20 },
  { id: 82, name: "TRIMAZOLE-DS TAB", category: "Tablets", quantity: 9 },
  { id: 83, name: "ZEMURA-200 TAB", category: "Tablets", quantity: 10 },
  { id: 84, name: "CYPRODINE TAB 4MG", category: "Tablets", quantity: 1 },
  { id: 85, name: "DICLOGEM GREEN TAB", category: "Tablets", quantity: 40 },
  { id: 86, name: "DICLOGEM MR TAB", category: "Tablets", quantity: 20 },
  { id: 87, name: "DERIPHYLLIN TAB", category: "Tablets", quantity: 6 },
  { id: 88, name: "ASTHALIN 4 MG TAB", category: "Tablets", quantity: 6 },
  { id: 89, name: "DEXONA TAB", category: "Tablets", quantity: 30 },
  { id: 90, name: "NEUROBION FORTE TAB", category: "Tablets", quantity: 6 },
  { id: 91, name: "ACILOC 300 MG TAB", category: "Tablets", quantity: 2 },
  { id: 92, name: "ENTERO QUINOL TAB", category: "Tablets", quantity: 3 },
  { id: 93, name: "METROGYL 400MG TAB", category: "Tablets", quantity: 4 },
  { id: 94, name: "METROGYL 200MG TAB", category: "Tablets", quantity: 6 },
  { id: 95, name: "VERTIN 16 MG TAB", category: "Tablets", quantity: 2 },
  { id: 96, name: "DIGENE TAB MINT", category: "Tablets", quantity: 6 },
  { id: 97, name: "URASONE TAB", category: "Tablets", quantity: 1 },
  { id: 98, name: "DULCOFLEX TAB", category: "Tablets", quantity: 10 },
  { id: 99, name: "WYSOLONE 5MG TAB", category: "Tablets", quantity: 8 },
  { id: 100, name: "WYSOLONE 10MG TAB", category: "Tablets", quantity: 8 },
  { id: 101, name: "AMLOKIND 5 TAB", category: "Tablets", quantity: 6 },
  { id: 102, name: "NORFLUXACIN & TINIDAZOLE TAB", category: "Tablets", quantity: 4 },
  { id: 103, name: "ALMOX DT-250 TAB", category: "Tablets", quantity: 5 },
  { id: 104, name: "NICE TAMOL AP TAB", category: "Tablets", quantity: 8 },
  { id: 105, name: "NORILET-TZ TAB", category: "Tablets", quantity: 10 },
  { id: 106, name: "ETOFORD 120 TAB", category: "Tablets", quantity: 6 },
  { id: 107, name: "ULCERID TAB", category: "Tablets", quantity: 1 },

  // Further Added Medicines
  { id: 108, name: "LULITEC CREAM", category: "Creams / Gels / Ointments", quantity: 4 },
  { id: 109, name: "OMNIGEL GEL", category: "Creams / Gels / Ointments", quantity: 3 },
  { id: 110, name: "OMNIGEL SPRAY 55GM", category: "Sprays", quantity: 2 },
  { id: 111, name: "OMNIGEL SPRAY 35GM", category: "Sprays", quantity: 2 },
  { id: 112, name: "TIGER BALM", category: "Creams / Gels / Ointments", quantity: 1 },
  { id: 113, name: "VICKS 5GM", category: "Others", quantity: 15 },
  { id: 114, name: "VICKS 12GM", category: "Others", quantity: 5 },
  { id: 115, name: "SANGAM OIL", category: "Others", quantity: 6 },
  { id: 116, name: "TIGER KING", category: "Others", quantity: 2 },
  { id: 117, name: "OULU PAIN RELIEF SPRAY", category: "Sprays", quantity: 4 },
  { id: 118, name: "MOOV ACTIVE SPRAY", category: "Sprays", quantity: 1 },
  { id: 119, name: "MOOV SPRAY", category: "Sprays", quantity: 1 },
  { id: 120, name: "CLOP G CREAM", category: "Creams / Gels / Ointments", quantity: 4 },
  { id: 121, name: "SUMO GEL", category: "Creams / Gels / Ointments", quantity: 4 },

  { id: 122, name: "GASOFAST", category: "Powders / ORS", quantity: 20 },
  { id: 123, name: "G.C 100GM", category: "Powders / ORS", quantity: 4 },
  { id: 124, name: "G.C 200GM", category: "Powders / ORS", quantity: 2 },
  { id: 125, name: "ELECTRAL POWDER", category: "Powders / ORS", quantity: 31 },
  { id: 126, name: "ELECTRAL 4.4 ORANGE SMALL", category: "Powders / ORS", quantity: 10 },

  { id: 127, name: "OXYTETRACYCLINE INJ. 30ML", category: "Injections / Ampoules", quantity: 2 },
  { id: 128, name: "CALVIT-12 INJ", category: "Injections / Ampoules", quantity: 2 },
  { id: 129, name: "TRINEUROSOL-H INJ", category: "Injections / Ampoules", quantity: 2 },
  { id: 130, name: "VITCOFOL VIAL", category: "Injections / Ampoules", quantity: 3 },
  { id: 131, name: "MAGENTA 20ML INJ", category: "Injections / Ampoules", quantity: 10 },
  { id: 132, name: "MERIDECA INJ. 20ML", category: "Injections / Ampoules", quantity: 5 },
  { id: 133, name: "T.T BETT INJ", category: "Injections / Ampoules", quantity: 20 },
  { id: 134, name: "ALMOXINJ 250 ", category: "Injections / Ampoules", quantity: 20 },
  { id: 135, name: "DEXASONE INJ. 2ML", category: "Injections / Ampoules", quantity: 12 },
  { id: 136, name: "Asthakind Syrup", category: "Syrups & Suspensions", quantity: 5 },
  { id: 137, name: "TusQ-DX Syrup", category: "Syrups & Suspensions", quantity: 5 },
  { id: 138, name: "TusQ-Dryl Syrup", category: "Syrups & Suspensions", quantity: 5 },
  { id: 139, name: "TusQ Syrup", category: "Syrups & Suspensions", quantity: 5 },
  { id: 140, name: "Alkasol Syrup", category: "Syrups & Suspensions", quantity: 5 },
  { id: 141, name: "Amject 500 mg", category: "Injections / Ampoules", quantity: 5 },
  { id: 142, name: "Calvit-12 Injection", category: "Injections / Ampoules", quantity: 5 },
  { id: 143, name: "Trineurosol-H Injection", category: "Injections / Ampoules", quantity: 5 },
  { id: 144, name: "Clop-G Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 145, name: "Betnovate-GM Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 146, name: "Betnovate-N Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 147, name: "Derobin Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 148, name: "Clobeta-G Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 149, name: "Eldosone-N Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 150, name: "Nurament Cream", category: "Creams / Ointments", quantity: 5 },
  { id: 151, name: "Ciplox Eye/Ear Drops", category: "Drops", quantity: 5 },
  { id: 152, name: "Moxi Eye Drops", category: "Drops", quantity: 5 },
  { id: 153, name: "Electral Orange Powder", category: "Powders", quantity: 5 },
  { id: 154, name: "Electral Powder Pouch", category: "Powders", quantity: 5 },
  { id: 155, name: "ORS Sachet", category: "Powders", quantity: 5 },
  { id: 156, name: "Clean & Clear Face Wash (50 ml)", category: "Face Wash", quantity: 5 },
  { id: 157, name: "Moov Gel", category: "Gel", quantity: 5 },
  { id: 158, name: "Digene Gel", category: "Gel", quantity: 5 },
  { id: 159, name: "Himalaya Baby Soap", category: "Soap", quantity: 5 },
  { id: 160, name: "Himalaya Shampoo (100 ml)", category: "Shampoo", quantity: 5 },
  { id: 161, name: "Hajmola Imli Jar", category: "Other Products", quantity: 5 },
  { id: 162, name: "Dabur Gripe Water", category: "Other Products", quantity: 5 },
  { id: 163, name: "Sankh Pushpi", category: "Other Products", quantity: 5 },
  { id: 164, name: "Vicks Action 500", category: "Other Products", quantity: 5 },
  { id: 165, name: "BhooSi (100 gm)", category: "Other Products", quantity: 5 },
  { id: 166, name: "G.D. 200 gm", category: "Other Products", quantity: 5 },
  { id: 167, name: "G.C. 200 gm", category: "Other Products", quantity: 5 },
  { id: 168, name: "G.C. 500 gm", category: "Other Products", quantity: 5 },
  { id: 169, name: "DICLOGEM MR TAB", category: "Tablets", quantity: 20 },
  { id: 170, name: "FENAK PLUS TAB", category: "Tablets", quantity: 20 },
  { id: 171, name: "SEPTRAN DS TAB", category: "Tablets", quantity: 4 },
  { id: 172, name: "ONDEM MD 4 TAB", category: "Tablets", quantity: 5 },
  { id: 173, name: "BANDY PLUS TAB", category: "Tablets", quantity: 10 },
  { id: 174, name: "BRUFEN 400", category: "Tablets", quantity: 3 },
  { id: 175, name: "DOXYCHL LB CAP", category: "Capsules", quantity: 4 },
  { id: 176, name: "MAXIRICH CAP", category: "Capsules", quantity: 3 },
  { id: 177, name: "CANDIFORCE 200 CAP", category: "Capsules", quantity: 6 },
  { id: 178, name: "MANFORCE 100 CAP", category: "Capsules", quantity: 1 },
  { id: 179, name: "NUROKIND GOLD CAP", category: "Capsules", quantity: 5 },
  { id: 180, name: "HEMO FORTE SYP 300ML", category: "Syrups & Suspensions", quantity: 3 },
  { id: 181, name: "AMPOXIN CV SUS 30ML", category: "Syrups & Suspensions", quantity: 6 },
  { id: 182, name: "C-ZEN PLUS SYP", category: "Syrups & Suspensions", quantity: 6 },
  { id: 183, name: "ALDIGESIC P+ SUS 60ML", category: "Syrups & Suspensions", quantity: 2 },
  { id: 184, name: "MONTULARG-LC SYP", category: "Syrups & Suspensions", quantity: 2 },
  { id: 185, name: "ACEFEN DS SUSPENSION", category: "Syrups & Suspensions", quantity: 3 },
  { id: 186, name: "ALKACITRUL SYP", category: "Syrups & Suspensions", quantity: 3 },
  { id: 187, name: "DEXORANGE SYRUP", category: "Syrups & Suspensions", quantity: 4 },
  { id: 188, name: "ALKASAL SYP", category: "Syrups & Suspensions", quantity: 2 },
  { id: 189, name: "HEPATOGLOBINE SYRUP 300ML", category: "Syrups & Suspensions", quantity: 2 },
  { id: 190, name: "ELECTROL POW ORANGE 4.4GM", category: "Powders", quantity: 50 },
  { id: 191, name: "K-MEDICO ORS POWDER", category: "Powders", quantity: 50 },
  { id: 192, name: "CLUBETA GM GREEN 10GM", category: "Creams / Ointments", quantity: 6 },
  { id: 193, name: "DULUKIND STRONG GEL 30G", category: "Gel", quantity: 2 },
  { id: 194, name: "SUMO GEL 30GM", category: "Gel", quantity: 4 },
  { id: 195, name: "LULITEC CREAM 30GM", category: "Creams / Ointments", quantity: 3 },
  { id: 196, name: "ACNESTAR GEL", category: "Gel", quantity: 1 },
  { id: 197, name: "BETNOVATE C OINT", category: "Creams / Ointments", quantity: 6 },
  { id: 198, name: "VOLINI GEL 12GM", category: "Gel", quantity: 2 },
  { id: 199, name: "DOLO PAIN RELIEF SPRAY", category: "Sprays", quantity: 1 },
  { id: 200, name: "OMNIGEL SPRAY 55GM", category: "Sprays", quantity: 2 },
  { id: 201, name: "OMNIGEL SPRAY 35GM", category: "Sprays", quantity: 2 },
  { id: 202, name: "VOLINI SPRAY 15GM", category: "Sprays", quantity: 1 },
  { id: 203, name: "OXYTETRACYCLINE INJ 30ML", category: "Injections / Ampoules", quantity: 3 },
  { id: 204, name: "NUROKIND GOLD INJ 2.5ML", category: "Injections / Ampoules", quantity: 3 },
];

export const inventoryMedicines = rawMedicines.map(item => ({
  name: item.name,
  category: item.category,
  price: 0,
  stock: item.quantity,
  inStock: item.quantity > 0,
  description: '',
  manufacturer: ''
}));

export const seedMedicinesToFirestore = async () => {
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

        // Commit batch every 400 documents
        if (count % 400 === 0) {
          await batch.commit();
          batch = writeBatch(db);
        }
      }
    }

    if (count % 400 !== 0) {
      await batch.commit();
    }

    return count;
  } catch (error) {
    console.error("Error seeding medicines: ", error);
    throw error;
  }
};
