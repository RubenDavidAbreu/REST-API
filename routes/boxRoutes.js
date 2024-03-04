// Importation des modules nécessaires
const express = require('express');
const router = express.Router(); // Utilisation de express.Router()
const boxController = require('../controllers/boxController'); // Assurez-vous que le chemin est correct

// Définition des routes
router.get('/', boxController.getAllBoxes); // Pour obtenir toutes les boîtes
router.post('/', boxController.createBox); // Pour créer une nouvelle boîte

// Exportation du routeur
module.exports = router;
