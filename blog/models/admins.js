const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définir le schéma pour l'admin
const adminSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Créer le modèle 'Admins'
const admins = mongoose.model("admins", adminSchema);

module.exports = admins;