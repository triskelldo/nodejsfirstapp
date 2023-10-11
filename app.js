const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
//const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware CORS
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
next();
});

// Configuration de la session
app.use(session({
    secret: 'tititatatoto',
    resave: false,
    saveUninitialized: false
    }));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());
    // Configuration de la stratégie locale (nom d'utilisateur et mot de passe)
    passport.use(new LocalStrategy(
    (username, password, done) => {
        // Ici, vous devrez vérifier si les informations d'authentification sont correctes
        // Si oui, appelez done(null, utilisateur) ; sinon, done(null, false)
        console.log(username);
        console.log(password);
        if(!username || !password) {
            return done(null, false)
        } else {
            return done(null, username)
        }
    }
));

// Sérialisation de l'utilisateur pour le stocker en session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Désérialisation de l'utilisateur à partir de la session
passport.deserializeUser((id, done) => {
// Ici, récupérez l'utilisateur en utilisant l'ID de session
// et appelez done(null, utilisateur) ou done(null, false) si l'utilisateur n'existe pas
    /*const utilisateur = { id: "tt" };
    done(null, utilisateur);*/
    const fakeUser = { id: 1, username: "john", password: "johndoe" };
  done(null, fakeUser);
});

// Votre route d'authentification
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login-fail'
    })/*, function(req, res) {
    res.redirect('/');
}*/);

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // L'utilisateur est authentifié, affichez le tableau de bord
        res.send('Tableau de bord');
    } else {
        // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        res.redirect('/login');
    }
    });

// Route simple
app.get('/api/data', (req, res) => {
    res.json({ message: 'Données accessibles avec CORS activé' });
});

app.get('/utilisateur/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Profil de l'utilisateur ${userId}`);
});

app.get('/accueil', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test1', (req, res) => {
    res.render('home', {
      title: 'Triskell knowledge',
    });
  });

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Triskell knowledge Login Page',
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Triskell knowledge Register Page',
    });
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Triskell knowledge Welcome !',
    });
});


app.get('/login-fail', (req, res) => {
    res.render('login-fail', {
        title: 'Triskell knowledge Login Failure !',
    });
});
  

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Serveur en écoute sur le port ${PORT}`);
});