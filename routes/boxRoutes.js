//Importation des modules comme dans index.js
const express = require('express');
const router = express();
const boxController = require('../controllers/boxController');

//utilisation et définition du chemin des routeurs
router.get('/', boxController.getAllBoxes);

module.exports = router;
