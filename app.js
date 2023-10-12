const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose')
const app = express();
const flash = require("express-flash");
const bodyParser = require("body-parser");

// Configuration de la connexion à MongoDB
mongoose.connect(
    //"mongodb://root:example@localhost:27017/blog?authSource=admin",
    "mongodb://admin:password@localhost:27017/blog",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
);

// Configuration de la session
app.use(session({
    secret: 'tititatatoto',
    resave: false,
    saveUninitialized: false
    }));

app.use(passport.initialize());
app.use(passport.session());

// Activation du module flash pour afficher des messages temporaires
app.use(flash());

// pour parser et analyser le formulaire que je soumet
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const homeRoutes = require("./blog/routes/home.js");
const authRoutes = require("./blog/routes/authentication.js");
const dashboardRoutes = require("./blog/routes/dashboard.js");
const articleRoutes = require("./blog/routes/articles.js");

// Utilisation des routes dans l'application
app.use("/", homeRoutes);
app.use("/articles", articleRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Serveur en écoute sur le port ${PORT}`);
});