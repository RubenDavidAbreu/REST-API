// Importation des modules Express(serveur web), PrismaClient(l'interaction avec la base de données), path(travailler avec les chemins de fichiers)
const express = require('express');
const boxRoutes = require('./routes/boxRoutes');
const path = require('path');
const boxController = require('./controllers/boxController');

// Initialisation Express
const app = express();

// Configuration d'Express (EJS comme moteur de template)
app.set('view engine', 'ejs');
// Définition du chemin vers le répertoire où sont stockés les fichiers de vue EJS
app.set('views', path.join(__dirname, 'views'));

app.use('/boxes', boxRoutes); //Utilisation d'un "Routeur"



//utilisation et définition du chemin des routeurs
app.get('/', boxController.getAllBoxes);
// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); // Confirmation du démarrage du serveur
});
