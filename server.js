const express = require("express");
const path = require("path");
const connectDB = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Sert tous les fichiers (HTML, CSS, JS, images, etc.)

// Route de test
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Connexion MongoDB
connectDB().then(() => {
  console.log("🎯 Base TIMCPBM prête !");
});

// Lancer le serveur
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur en marche sur http://localhost:${PORT}`);
});