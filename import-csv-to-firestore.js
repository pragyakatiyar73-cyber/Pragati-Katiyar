const admin = require('firebase-admin');
const fs = require('fs');

// ============================================================================
// SETUP INSTRUCTIONS:
// 1. Go to Firebase Console -> Project Settings -> Service Accounts
// 2. Click "Generate new private key" and download the JSON file
// 3. Rename the downloaded file to 'serviceAccountKey.json' and place it in the same folder as this script
// 4. Create your 'medicines.csv' file in the same folder with headers: name,category,price,stock,company
// 5. Open terminal in this folder and run: 
//    npm install firebase-admin
//    node import-csv-to-firestore.js
// ============================================================================

const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json';
const CSV_FILE = './medicines.csv';

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

async function importCSV() {
  if (!fs.existsSync(CSV_FILE)) {
    console.error(`\n❌ Error: Cannot find ${CSV_FILE}`);
    console.error(`Please create the CSV file with your medicines data.\n`);
    return;
  }

  const csvData = fs.readFileSync(CSV_FILE, 'utf8');
  // Split by line and remove empty lines
  const lines = csvData.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (lines.length < 2) {
    console.error('\n❌ Error: CSV file is empty or has only headers.\n');
    return;
  }

  // Parse headers (assuming comma separated)
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  console.log(`\n📋 Found headers: ${headers.join(', ')}`);

  // We use a batch for faster writes, Firestore limit is 500 per batch
  let batch = db.batch();
  let count = 0;
  let batchCount = 0;

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV split (Note: this does not handle commas inside quotes)
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length !== headers.length) {
      console.warn(`⚠️  Skipping line ${i + 1}: column count mismatch.`);
      continue;
    }

    const docRef = db.collection('medicines').doc();
    const data = {};

    headers.forEach((header, index) => {
      let value = values[index];
      
      // Type conversions
      if (header === 'price' || header === 'stock') {
        value = Number(value) || 0;
      }
      
      data[header] = value;
    });

    // Optional: Add timestamp or stock boolean
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    data.inStock = data.stock > 0;

    batch.set(docRef, data);
    count++;
    batchCount++;

    // Commit batch every 400 records to stay safely under the 500 limit
    if (batchCount === 400) {
      await batch.commit();
      console.log(`✅ Committed ${count} records so far...`);
      // Start a new batch
      batch = db.batch();
      batchCount = 0;
    }
  }

  // Commit any remaining records
  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`\n🎉 Success! Imported ${count} medicines into Firestore collection 'medicines'.\n`);
}

importCSV().catch(console.error);
