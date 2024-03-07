// Importation des modules nécessaires
const express = require('express');
const router = express.Router(); // Utilisation de express.Router()
const alimentController = require('../controllers/alimentController'); // Assurez-vous que le chemin est correct

// Définition des routes
router.put('/', alimentController.updateAliment); // Pour modifier une nouvelle boîte

// Exportation du routeur
module.exports = router;
