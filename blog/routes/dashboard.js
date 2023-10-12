const express = require("express");
const router = express.Router();

// Middleware pour vérifier si l'utilisateur est authentifié
const isAuthenticated = (req, res, next) => {
    console.log("req.user", req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};

// Route pour afficher le dashboard
router.get("/dashboard", isAuthenticated, (req, res) => {
    console.log("dashboard");
    res.render("dashboard/index");
});

module.exports = router;