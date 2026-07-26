import { Pill, Activity, Syringe, TestTube, Leaf, Droplet, Heart, Apple, Coffee, Store, Sun } from 'lucide-react';

export const storeInfo = {
  name: "Katiyar Medical Store",
  address: "Rautapur Bamba, Bela Road, Chaubepur, Kanpur Nagar",
  phone: "8726713648",
  email: "katiyarmedical17@gmail.com",
  hours: "10:00 AM - 8:00 PM (Open Daily 10 Hours)",
  owner: "Drx. Shivam Katiyar",
  degree: "B.Pharm (Pharmacist)"
};

export const services = [
  { id: 1, title: 'Prescription Medicines', icon: Pill, description: 'Authentic prescription medications filled by certified pharmacists.' },
  { id: 2, title: 'Over-the-Counter', icon: Activity, description: 'Common medicines for quick relief from minor ailments.' },
  { id: 3, title: 'Health Supplements', icon: Heart, description: 'Vitamins and dietary supplements for everyday wellness.' },
  { id: 4, title: 'Diabetes Care', icon: Syringe, description: 'Insulin, blood sugar monitors, and specialized care products.' },
  { id: 5, title: 'Lab Tests', icon: TestTube, description: 'Sample collection and diagnostic health testing services.' },
  { id: 6, title: 'In-Store Pickup', icon: Store, description: 'Order by phone and pick up directly at the store. (No home delivery available)' }
];

export const categories = [
  { name: 'Vitamin Store', icon: Heart },
  { name: 'Health Store', icon: Activity },
  { name: 'Summer Store', icon: Sun },
  { name: 'Homeopathy Care', icon: Droplet },
  { name: 'Ayurvedic Care', icon: Leaf },
  { name: 'Glucon-D & Energy', icon: Coffee },
  { name: 'Personal Care', icon: Heart },
  { name: 'Healthy Food & Drinks', icon: Apple }
];

export const healthConcerns = [
  { name: 'Fever & Cold', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Skin Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Bone & Joint', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Heart Health', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Stomach Care', image: 'https://images.unsplash.com/photo-1576602976047-174e508eb6d4?auto=format&fit=crop&q=80&w=400&h=300' },
  { name: 'Diabetes Management', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=400&h=300' },
];

export const inventoryMedicines = [
  // Tablets
  { id: 't1', name: 'Amokind-ST', category: 'Tablets', inStock: true },
  { id: 't2', name: 'Neurobion Forte', category: 'Tablets', inStock: true },
  { id: 't3', name: 'A to Z', category: 'Tablets', inStock: true },
  { id: 't4', name: 'A to Z Gold', category: 'Tablets', inStock: true },
  { id: 't5', name: 'Levocet', category: 'Tablets', inStock: true },
  { id: 't6', name: 'Regestrone', category: 'Tablets', inStock: true },
  { id: 't7', name: 'Telmikind AM', category: 'Tablets', inStock: true },
  { id: 't8', name: 'Glimstar M2', category: 'Tablets', inStock: true },
  { id: 't9', name: 'Zifi 200', category: 'Tablets', inStock: true },
  { id: 't10', name: 'Taxim-O 200', category: 'Tablets', inStock: true },
  { id: 't11', name: 'Mahagaba M75', category: 'Tablets', inStock: true },
  { id: 't12', name: 'Manforce 100', category: 'Tablets', inStock: true },
  { id: 't13', name: 'Zerodol SP', category: 'Tablets', inStock: true },
  { id: 't14', name: 'Pan-D', category: 'Tablets', inStock: true },
  { id: 't15', name: 'Clavam 625', category: 'Tablets', inStock: true },
  { id: 't16', name: 'Combiflam', category: 'Tablets', inStock: true },
  { id: 't17', name: 'Dolo 500', category: 'Tablets', inStock: true },
  { id: 't18', name: 'Tegretal 200', category: 'Tablets', inStock: true },
  { id: 't19', name: 'Zifi-100 DT', category: 'Tablets', inStock: true },
  { id: 't20', name: 'Metrogyl 400', category: 'Tablets', inStock: true },
  { id: 't21', name: 'Nurokind Plus', category: 'Tablets', inStock: true },
  { id: 't22', name: 'Pregabalin', category: 'Tablets', inStock: true },
  { id: 't23', name: 'Almox 500', category: 'Tablets', inStock: true },
  { id: 't24', name: 'Fluzan 150', category: 'Tablets', inStock: true },
  { id: 't25', name: 'Drotin-DS', category: 'Tablets', inStock: true },
  { id: 't26', name: 'Dulcolax', category: 'Tablets', inStock: true },

  // Syrups (SYP)
  { id: 's1', name: 'Asthalin Syrup', category: 'Syrups', inStock: true },
  { id: 's2', name: 'Dolo 250 Syrup', category: 'Syrups', inStock: true },
  { id: 's3', name: 'Livolin Syrup', category: 'Syrups', inStock: true },
  { id: 's4', name: 'Electral Syrup', category: 'Syrups', inStock: true },
  { id: 's5', name: 'Digene Gel Mint Syrup', category: 'Syrups', inStock: true },
  { id: 's6', name: 'Asthakind Syrup', category: 'Syrups', inStock: true },
  { id: 's7', name: 'TusQ-DX Syrup', category: 'Syrups', inStock: true },
  { id: 's8', name: 'TusQ-Dryl Syrup', category: 'Syrups', inStock: true },
  { id: 's9', name: 'TusQ Syrup', category: 'Syrups', inStock: true },
  { id: 's10', name: 'Alkasol Syrup', category: 'Syrups', inStock: true },

  // Injections
  { id: 'i1', name: 'Amject 500 mg', category: 'Injections', inStock: true },
  { id: 'i2', name: 'Calvit-12 Injection', category: 'Injections', inStock: true },
  { id: 'i3', name: 'Trineurosol-H Injection', category: 'Injections', inStock: true },

  // Creams / Ointments
  { id: 'c1', name: 'Clop-G Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c2', name: 'Betnovate-GM Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c3', name: 'Betnovate-N Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c4', name: 'Derobin Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c5', name: 'Clobeta-G Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c6', name: 'Eldosone-N Cream', category: 'Creams & Ointments', inStock: true },
  { id: 'c7', name: 'Nurament Cream', category: 'Creams & Ointments', inStock: true },

  // Drops
  { id: 'd1', name: 'Ciplox Eye/Ear Drops', category: 'Drops', inStock: true },
  { id: 'd2', name: 'Moxi Eye Drops', category: 'Drops', inStock: true },

  // Powders
  { id: 'p1', name: 'Electral Orange Powder', category: 'Powders', inStock: true },
  { id: 'p2', name: 'Electral Powder Pouch', category: 'Powders', inStock: true },
  { id: 'p3', name: 'ORS Sachet', category: 'Powders', inStock: true },

  // Face Wash
  { id: 'fw1', name: 'Clean & Clear Face Wash (50 ml)', category: 'Face Wash', inStock: true },

  // Gel
  { id: 'g1', name: 'Moov Gel', category: 'Gel', inStock: true },
  { id: 'g2', name: 'Digene Gel', category: 'Gel', inStock: true },

  // Soap
  { id: 'so1', name: 'Himalaya Baby Soap', category: 'Soap', inStock: true },

  // Shampoo
  { id: 'sh1', name: 'Himalaya Shampoo (100 ml)', category: 'Shampoo', inStock: true },

  // Other Products
  { id: 'o1', name: 'Hajmola Imli Jar', category: 'Other Products', inStock: true },
  { id: 'o2', name: 'Dabur Gripe Water', category: 'Other Products', inStock: true },
  { id: 'o3', name: 'Sankh Pushpi', category: 'Other Products', inStock: true },
  { id: 'o4', name: 'Vicks Action 500', category: 'Other Products', inStock: true },
  { id: 'o5', name: 'BhooSi (100 gm)', category: 'Other Products', inStock: true },
  { id: 'o6', name: 'G.D. 200 gm', category: 'Other Products', inStock: true },
  { id: 'o7', name: 'G.C. 200 gm', category: 'Other Products', inStock: true },
  { id: 'o8', name: 'G.C. 500 gm', category: 'Other Products', inStock: true },

  // --- Recently Added Medicines ---
  // Tablets & Capsules
  { id: 't27', name: 'FLUKA-150 TAB', category: 'Tablets', inStock: true },
  { id: 't28', name: 'MAXIRICH CAP', category: 'Tablets', inStock: true },
  { id: 't29', name: 'NICIP COLD & FLU TAB', category: 'Tablets', inStock: true },
  { id: 't30', name: 'VIGORE 100 TAB', category: 'Tablets', inStock: true },
  { id: 't31', name: 'DEXALIFE-TAB', category: 'Tablets', inStock: true },
  { id: 't32', name: 'MECOFOL PLUS NF CAP', category: 'Tablets', inStock: true },
  { id: 't33', name: 'OFLOTAS-OZ TAB', category: 'Tablets', inStock: true },
  { id: 't34', name: 'FENAK PLUS TAB', category: 'Tablets', inStock: true },
  { id: 't35', name: 'IBULAB TAB', category: 'Tablets', inStock: true },
  { id: 't36', name: 'TRIMAZOLE-DS TAB', category: 'Tablets', inStock: true },
  { id: 't37', name: 'ZEMURA-200 TAB', category: 'Tablets', inStock: true },
  { id: 't38', name: 'CYPRODINE TAB 4MG', category: 'Tablets', inStock: true },
  { id: 't39', name: 'DICLOGEM GREEN TAB', category: 'Tablets', inStock: true },
  { id: 't40', name: 'DICLOGEM MR TAB', category: 'Tablets', inStock: true },
  { id: 't41', name: 'DERIPHYLLIN TAB.', category: 'Tablets', inStock: true },
  { id: 't42', name: 'ASTHALIN 4 MG TAB', category: 'Tablets', inStock: true },
  { id: 't43', name: 'DEXONA TAB', category: 'Tablets', inStock: true },
  { id: 't44', name: 'NEUROBION FORTE TAB', category: 'Tablets', inStock: true },
  { id: 't45', name: 'ACILOC 300 MG TAB', category: 'Tablets', inStock: true },
  { id: 't46', name: 'ENTERO QUINOL TAB', category: 'Tablets', inStock: true },
  { id: 't47', name: 'METROGYL 400MG', category: 'Tablets', inStock: true },
  { id: 't48', name: 'METROGYL 200MG TAB', category: 'Tablets', inStock: true },
  { id: 't49', name: 'VERTIN 16 MG TAB', category: 'Tablets', inStock: true },
  { id: 't50', name: 'DIGENE TAB MINT', category: 'Tablets', inStock: true },
  { id: 't51', name: 'URASONE TAB', category: 'Tablets', inStock: true },
  { id: 't52', name: 'DECOSULES CAP', category: 'Tablets', inStock: true },
  { id: 't53', name: 'DULCOFLEX TAB', category: 'Tablets', inStock: true },
  { id: 't54', name: 'WYSOLONE 5MG TAB', category: 'Tablets', inStock: true },
  { id: 't55', name: 'WYSOLONE 10MG TAB', category: 'Tablets', inStock: true },
  { id: 't56', name: 'AMLOKIND 5 TAB', category: 'Tablets', inStock: true },
  { id: 't57', name: 'NORFLUXACIN & TINIDAZOLE TAB', category: 'Tablets', inStock: true },
  { id: 't58', name: 'ALMOX DT-250 TAB', category: 'Tablets', inStock: true },
  { id: 't59', name: 'NICE TAMOL AP TAB', category: 'Tablets', inStock: true },
  { id: 't60', name: 'NORILET-TZ TAB', category: 'Tablets', inStock: true },
  { id: 't61', name: 'KUFFDRYL-D CAP', category: 'Tablets', inStock: true },
  { id: 't62', name: 'ETOFORD 120 TAB', category: 'Tablets', inStock: true },
  { id: 't63', name: 'ULCERID TAB', category: 'Tablets', inStock: true },

  // Syrups, Suspensions & Drops
  { id: 's11', name: 'DABUR JAMUN NEEM KAR (1L)', category: 'Syrups', inStock: true },
  { id: 's12', name: 'AMPOXIN CV SUS. 30ML', category: 'Syrups', inStock: true },
  { id: 'd3', name: 'MOXI EYE DROP 10ML', category: 'Drops', inStock: true },
  { id: 'd4', name: 'EARWEL EAR DROP 5ML', category: 'Drops', inStock: true },
  { id: 's13', name: 'MAGNAKUF-DX SYP', category: 'Syrups', inStock: true },
  { id: 's14', name: 'TUSSCODINE-DX SYP', category: 'Syrups', inStock: true },
  { id: 's15', name: 'DEXORANGE SYP 200ML', category: 'Syrups', inStock: true },
  { id: 's16', name: 'HEPTOGLOBINE SYP (300ML)', category: 'Syrups', inStock: true },
  { id: 's17', name: 'C-ZEN PLUS SYP (60 ML)', category: 'Syrups', inStock: true },
  { id: 's18', name: 'DEXORANGE SYRUP (1X200)', category: 'Syrups', inStock: true },
  { id: 's19', name: 'DULUKUFF DS SUSP. 60ML', category: 'Syrups', inStock: true },
  { id: 's20', name: 'TUSSOL BR SYP 100ML', category: 'Syrups', inStock: true },
  { id: 's21', name: 'TUSSOL DRYL SYP 100ML', category: 'Syrups', inStock: true },
  { id: 's22', name: 'FERCEE RED SYP 225ML', category: 'Syrups', inStock: true },
  { id: 's23', name: 'OFLOX OZ SYP 60 ML', category: 'Syrups', inStock: true },
  { id: 's24', name: 'NICETAMUL MF SYP', category: 'Syrups', inStock: true },
  { id: 's25', name: 'DRS MEDWIN', category: 'Syrups', inStock: true },
  { id: 's26', name: 'MEDSETRON SYRUP (30 ML)', category: 'Syrups', inStock: true },
  { id: 's27', name: 'DEF-M SUSPENSION 30ML', category: 'Syrups', inStock: true },

  // Ointments, Creams, Gels & Sprays
  { id: 'c8', name: 'LULITEC CREAM 30GM', category: 'Creams & Ointments', inStock: true },
  { id: 'g3', name: 'OMNIGEL 20GM', category: 'Gel', inStock: true },
  { id: 'sp1', name: 'OMNIGEL SPRAY 55GM', category: 'Sprays', inStock: true },
  { id: 'sp2', name: 'OMNIGEL SPRAY 35GM', category: 'Sprays', inStock: true },
  { id: 'c9', name: 'TIGER BALM (10GM)', category: 'Creams & Ointments', inStock: true },
  { id: 'c10', name: 'VICKS 5GM', category: 'Creams & Ointments', inStock: true },
  { id: 'o9', name: 'SANGAM OIL', category: 'Other Products', inStock: true },
  { id: 'c11', name: 'TIGER KING', category: 'Creams & Ointments', inStock: true },
  { id: 'c12', name: 'VICKS 12GM', category: 'Creams & Ointments', inStock: true },
  { id: 'sp3', name: 'OULU PAIN RELIEF SPRAY (50 ML)', category: 'Sprays', inStock: true },
  { id: 'sp4', name: 'MOOV ACTIVE SPRAY 15GM', category: 'Sprays', inStock: true },
  { id: 'sp5', name: 'MOOV SPRAY 35GM', category: 'Sprays', inStock: true },
  { id: 'c13', name: 'CLOP G CREAM (30GM)', category: 'Creams & Ointments', inStock: true },
  { id: 'g4', name: 'SUMO GEL 30GM', category: 'Gel', inStock: true },

  // Powders & Sachets
  { id: 'p4', name: 'GASOFAST', category: 'Powders', inStock: true },
  { id: 'p5', name: 'G.C 100GM', category: 'Powders', inStock: true },
  { id: 'p6', name: 'G.C 200GM', category: 'Powders', inStock: true },
  { id: 'p7', name: 'ELECTRAL POWDER (21.8GM)', category: 'Powders', inStock: true },
  { id: 'p8', name: 'ELECTRAL 4.4 ORANGE SMALL', category: 'Powders', inStock: true },
  { id: 'p9', name: 'ELECTRAL POWDER (1XBOX)', category: 'Powders', inStock: true },

  // Injections & Ampoules
  { id: 'i4', name: 'OXYTETRACYCLINE INJ. 30ML', category: 'Injections', inStock: true },
  { id: 'i5', name: 'CALVIT-12 INJ (15ML)', category: 'Injections', inStock: true },
  { id: 'i6', name: 'TRINEUROSOL-H INJ (5ML)', category: 'Injections', inStock: true },
  { id: 'i7', name: 'VITCOFOL VIAL (10ML)', category: 'Injections', inStock: true },
  { id: 'i8', name: 'MAGENTA 20ML INJ', category: 'Injections', inStock: true },
  { id: 'i9', name: 'MERIDECA INJ. 20ML', category: 'Injections', inStock: true },
  { id: 'i10', name: 'T.T BETT INJ.', category: 'Injections', inStock: true },
  { id: 'i11', name: 'ALMOX 250 INJ...', category: 'Injections', inStock: true },
  { id: 'i12', name: 'DEXASONE INJ. 2ML', category: 'Injections', inStock: true },

  // Other / Condoms / Health
  { id: 'o10', name: 'CUPID CHOCOLATE (CONDOMS)', category: 'Other Products', inStock: true },
  { id: 'o11', name: 'CUPID SUPER DOTTED (CONDOMS)', category: 'Other Products', inStock: true },
  { id: 'o12', name: 'PREGANIURTH CARD (Pregnancy Test Card)', category: 'Other Products', inStock: true },

  // --- More Recently Added Medicines ---
  // Tablets
  { id: 't64', name: 'D S P TAB', category: 'Tablets', inStock: true },
  { id: 't65', name: 'NEWARROW-B12 FORTE', category: 'Tablets', inStock: true },
  { id: 't66', name: 'NORFLOX-400 TAB', category: 'Tablets', inStock: true },
  { id: 't67', name: 'NEUROBION FORT TAB', category: 'Tablets', inStock: true },
  { id: 't68', name: 'DOLOGESIC-SP TAB', category: 'Tablets', inStock: true },
  { id: 't69', name: 'HEXAMENTIN-625 TAB', category: 'Tablets', inStock: true },
  { id: 't70', name: 'AMOXYCLAV 625 TAB', category: 'Tablets', inStock: true },
  { id: 't71', name: 'MONORIN-150 TAB', category: 'Tablets', inStock: true },
  { id: 't72', name: 'MOKCAN CV 625', category: 'Tablets', inStock: true },
  { id: 't73', name: 'FUNGICIP 200 TAB', category: 'Tablets', inStock: true },
  { id: 't74', name: 'WICIP GOLD & FLU TAB', category: 'Tablets', inStock: true },
  { id: 't75', name: 'NOVACLAV-625 TAB', category: 'Tablets', inStock: true },
  { id: 't76', name: 'ORO-CV 625 TAB', category: 'Tablets', inStock: true },
  { id: 't77', name: 'MUXANVUE CV 625', category: 'Tablets', inStock: true },
  { id: 't78', name: 'KOLD TIME TAB', category: 'Tablets', inStock: true },
  { id: 't79', name: 'SEPTRAN DS TAB', category: 'Tablets', inStock: true },
  { id: 't80', name: 'ONDEM MD 4 TAB', category: 'Tablets', inStock: true },
  { id: 't81', name: 'BANDY PLUS TAB', category: 'Tablets', inStock: true },
  { id: 't82', name: 'BRUFEN 400', category: 'Tablets', inStock: true },

  // Capsules
  { id: 'cap1', name: 'DOXYCHL LB CAP', category: 'Capsules', inStock: true },
  { id: 'cap2', name: 'CANDIFORCE 200 CAP', category: 'Capsules', inStock: true },
  { id: 'cap3', name: 'MANFORCE 100 CAP', category: 'Capsules', inStock: true },
  { id: 'cap4', name: 'NUROKIND GOLD CAP', category: 'Capsules', inStock: true },

  // Syrups / Suspensions
  { id: 's28', name: 'HEMO FORTE SYP 300ML', category: 'Syrups', inStock: true },
  { id: 's29', name: 'ALDIGESIC P+ SUS 60ML', category: 'Syrups', inStock: true },
  { id: 's30', name: 'MONTULARG-LC SYP', category: 'Syrups', inStock: true },
  { id: 's31', name: 'ACEFEN DS SUSPENSION', category: 'Syrups', inStock: true },
  { id: 's32', name: 'ALKACITRUL SYP', category: 'Syrups', inStock: true },
  { id: 's33', name: 'ALKASAL SYP', category: 'Syrups', inStock: true },

  // Powders / ORS
  { id: 'p10', name: 'ELECTROL POW ORANGE 4.4GM', category: 'Powders', inStock: true },
  { id: 'p11', name: 'K-MEDICO ORS POWDER', category: 'Powders', inStock: true },

  // Creams / Gels / Ointments
  { id: 'c14', name: 'CLUBETA GM GREEN 10GM', category: 'Creams & Ointments', inStock: true },
  { id: 'g5', name: 'DULUKIND STRONG GEL 30G', category: 'Gel', inStock: true },
  { id: 'g6', name: 'ACNESTAR GEL', category: 'Gel', inStock: true },
  { id: 'c15', name: 'BETNOVATE C OINT', category: 'Creams & Ointments', inStock: true },
  { id: 'g7', name: 'VOLINI GEL 12GM', category: 'Gel', inStock: true },

  // Sprays
  { id: 'sp6', name: 'DOLO PAIN RELIEF SPRAY', category: 'Sprays', inStock: true },
  { id: 'sp7', name: 'VOLINI SPRAY 15GM', category: 'Sprays', inStock: true },

  // Injections / Ampoules
  { id: 'i13', name: 'NUROKIND GOLD INJ', category: 'Injections', inStock: true },
  { id: 'i14', name: 'NEUROBION FORT AMP', category: 'Injections', inStock: true },

  // Others
  { id: 'o13', name: 'VICKS JAR', category: 'Other Products', inStock: true },
  { id: 'o14', name: 'NASAL INF INHALER', category: 'Other Products', inStock: true },
  { id: 'o15', name: 'ISABGOL 100GM (T)', category: 'Other Products', inStock: true },

  // Gels / Balms
  { id: 'g8', name: 'MOOV 10GM', category: 'Gel', inStock: true },
  { id: 'g9', name: 'ZANDU BALM 8M', category: 'Creams & Ointments', inStock: true },
  { id: 'g10', name: 'ZANDU BALM ULTRA 8M', category: 'Creams & Ointments', inStock: true },

  // Sprays
  { id: 'sp8', name: 'MOOV SPRAY 15G', category: 'Sprays', inStock: true },

  // Syrups
  { id: 's34', name: 'SAFI 100ML', category: 'Syrups', inStock: true },
  { id: 's35', name: 'SAFI 200ML', category: 'Syrups', inStock: true },

  // Tablets
  { id: 't83', name: 'AZURI TAB. 10TAB.', category: 'Tablets', inStock: true },
];
