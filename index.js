// Importation des modules Express(serveur web), PrismaClient(l'interaction avec la base de données), path(travailler avec les chemins de fichiers)
const express = require('express');
const boxRoutes = require('./routes/boxRoutes');

const boxController = require('./controllers/boxController');

// Initialisation Express
const app = express();
app.use('/boxes', boxRoutes); //Utilisation d'un "Routeur"



//utilisation et définition du chemin des routeurs
app.get('/', boxController.getAllBoxes);
// app.get('/', boxController.createBoxes);

// app.post('/', boxController.AllBoxes);
// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); // Confirmation du démarrage du serveur
});
