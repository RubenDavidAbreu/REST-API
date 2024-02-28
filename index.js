// Importation des modules Express(serveur web), PrismaClient(l'interaction avec la base de données), path(travailler avec les chemins de fichiers)
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Initialisation client Prisma et Express
const prisma = new PrismaClient();
const app = express();

// Configuration d'Express (EJS comme moteur de template)
app.set('view engine', 'ejs');
// Définition du chemin vers le répertoire où sont stockés les fichiers de vue EJS
app.set('views', path.join(__dirname, 'views'));

// Fonction asynchrone pour récupérer les données des box et les transformer
async function fetchDataAndRenderPage() {
  // Récupération des données des box avec relations 'boxaliment' 'flavor' 
  const allBoxes = await prisma.box.findMany({
    include: {
      boxaliment: {
        include: {
          aliment: true, // données des aliments associés à chaque boxaliment
        },
      },
      flavor: true, // données des saveurs associées à chaque box
    },
  });

  // Transformation des données récupérées
  const transformedData = allBoxes.map(box => ({
    id: box.idBox,
    nom: box.nom,
    pieces: box.pieces,
    prix: box.price,
    image: box.image,
    aliments: box.boxaliment.map(ba => ({
      nom: ba.aliment.nom, // Nom de l'aliment
      quantite: ba.quantity, // Quantité de l'aliment
    })),
    saveurs: box.flavor.map(flavor => flavor.nom), // Noms des saveurs
  }));
  console.log(transformedData);
  return transformedData; // Retourne les données transformées
  
}

// Fonction pour configurer les routes de l'application
async function setupRoutes() {
  // Route principale qui rend la page des boîtes
  app.get('/', async (req, res) => {
    const allBoxes = await fetchDataAndRenderPage(); // Récupération et transformation des données
    res.render('box', { allBoxes }); // Envoi des données au template 'box' pour le rendu
  });
  
}

// Configuration et gestion des erreurs potentielles
setupRoutes().catch(console.error);

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); // Confirmation du démarrage du serveur
});
