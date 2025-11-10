import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// --- Création de l'application Express ---
const app = express();
app.use(express.json());
app.use(cors());

// --- Connexion à MongoDB ---
mongoose.connect("mongodb://127.0.0.1:27017/timcpbm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((error) => console.error("Erreur de connexion MongoDB :", error));

// --- Définition du modèle Utilisateur ---
const utilisateurSchema = new mongoose.Schema({
  nom: String,
  email: String,
  motdepasse: String,
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

// --- Route principale ---
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur TIMCPBM 🚀");
});

// --- Route pour récupérer tous les utilisateurs ---
app.get("/api/utilisateurs", async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Route pour ajouter un utilisateur ---
app.post("/api/utilisateurs", async (req, res) => {
  try {
    const nouvelUtilisateur = new Utilisateur(req.body);
    await nouvelUtilisateur.save();
    res.status(201).json(nouvelUtilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- Lancement du serveur ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌍 Serveur en ligne sur http://localhost:${PORT}`);
});