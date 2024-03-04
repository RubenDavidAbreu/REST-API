const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await prisma.box.findMany({
      include: {
        aliment: true,
        flavor: true,
      },
    });
    const camion = allBoxes.map((box) => {
      const aliment = box.aliment.map((alim) => {
        if (alim) {
          return {
            name: alim.name,
            quantity: alim.quantity,
          };
        }
      });
      const flavor = box.flavor.map((flav) => {
        if (flav) {
          return {
            name: flav.name,
          };
        }
      });
      return {
        ...box,
        aliment: aliment,
        flavor: flavor,
      };
    });

    res.send(`<pre>${JSON.stringify(camion, null, 2)}</pre>`);
    // Transformez vos données ici si nécessaire
  } catch (error) {
    res.status(500).send(`Erreur lors de la récupération des boîtes ${error}`);
  }
};

exports.createBox = async (req, res) => {
  try {
    // Récupération des données envoyées dans la requête, y compris idBox
    const { idBox, name, pieces, price, image, aliment, flavor } = req.body;

    // Validation basique des données d'entrée, y compris idBox
    if (typeof idBox === 'undefined' || !name || typeof pieces === 'undefined' || typeof price === 'undefined' || !image) {
      return res.status(400).send("Certaines données nécessaires sont manquantes.");
    }

    // Création d'une nouvelle boîte dans la base de données
    const newBox = await prisma.box.create({
      data: {
        idBox, // Inclure idBox ici
        name,
        pieces,
        price,
        image,
        aliment: {
          create: aliment,
        },
        flavor: {
          create: flavor,
        },
      },
      include: {
        aliment: true,
        flavor: true,
      },
    });

    // Envoie la boîte nouvellement créée en réponse
    res.status(201).json(newBox);
  } catch (error) {
    res.status(500).send(`Erreur lors de la création de la boîte : ${error.message}`);
  }
};










