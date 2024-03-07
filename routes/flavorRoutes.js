// Importation des modules nécessaires
const express = require('express');
const router = express.Router(); // Utilisation de express.Router()
const flavorController = require('../controllers/flavorController'); // Assurez-vous que le chemin est correct

// Définition des routes
router.put('/', flavorController.updateFlavor); // Pour modifier une nouvelle boîte

// Exportation du routeur
module.exports = router;