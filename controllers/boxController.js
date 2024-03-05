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
  
    const { idBox, name, pieces, price, image, aliment, flavor } = req.body;
    const newBox = await prisma.box.create({
      data: {
        idBox, 
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
    
    res.status(201).json(newBox);
  } catch (error) {
    res.status(500).send(`Erreur lors de la création de la boîte : ${error.message}`);
  }
};










