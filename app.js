const express = require('express');
const path = require('path');
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
  

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Serveur en écoute sur le port ${PORT}`);
});