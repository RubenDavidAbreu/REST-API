// Importation des modules nécessaires
const express = require('express');
const boxRoutes = require('./routes/boxRoutes'); // Assurez-vous que le chemin est correct

// Initialisation d'Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routeurs
app.use('/boxes', boxRoutes); // Toutes les routes dans boxRoutes.js seront préfixées par '/boxes'

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

