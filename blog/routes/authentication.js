const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Page de connexion
router.get("/login", authController.getLogin);
// Page d'inscription
router.get("/register", authController.getRegister);
// Traitement du formulaire d'incription
router.get("/register", authController.postRegister);
// Traitement du formulaire de connexion
router.post("/login", authController.postLogin);
// Déconnexion
router.get("/logout", authController.logout);

module.exports = router;
