const { MongoClient } = require("mongodb");

// Adresse locale de ta base MongoDB
const uri = "mongodb://127.0.0.1:27017";

// Nom de ta base
const dbName = "TIMCPBM";

async function connectDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connecté à MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
  }
}

module.exports = connectDB;