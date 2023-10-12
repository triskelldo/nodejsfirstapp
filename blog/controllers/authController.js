//const bcrypt = require("bcrypt");
const crypto= require('crypto');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admins");

// Fonction pour initialiser Passport
passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log("username", username);
        console.log("password", password);
        try {
            const admin = await Admin.findOne({ user: username });
            //console.log("admin", admin);
            if (!admin) {
                return done(null, false, { message: "Nom d'utilisateur incorrect" });
            }
            //const passwordMatch = await bcrypt.compare(password, admin.password);
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            let passwordMatch = false;

            if (hashedPassword===admin.password) {
                passwordMatch = true;
            }
            if (passwordMatch) {
                return done(null, admin);
            } else {
                console.log("error");
                return done(null, false, { message: "Mot de passe incorrect" });
            }
        } catch (error) {
            return done(error);
        }
    })
);

// Sérialisation de l'utilisateur pour le stocker en session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// Désérialisation de l'utilisateur à partir de la session
passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (error) {
      done(error);
    }
  });
  
// Middleware pour vérifier si l'utilisateur est authentifié
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};

// Contrôleur pour la page de connexion
exports.getLogin = (req, res) => {
    res.render("login");
};

// Contrôleur pour la page d'inscription
exports.getRegister = (req, res) => {
    res.render("register");
};

// Contrôleur pour le traitement du formulaire de connexion
exports.postLogin = passport.authenticate("local", {
    successRedirect: "/articles",
    failureRedirect: "/auth/login",
    failureFlash: true
});

exports.postRegister = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/register",
    failureFlash: true
});

// Contrôleur pour la déconnexion
exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};
