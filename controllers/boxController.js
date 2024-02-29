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
    const camion = allBoxes.map(box => {
      const aliment = box.aliment.map((alim) => {
        if (alim) {
          return {
            nom: alim.nom,
            quantity: alim.quantity,
          };
        }
      });
      const flavor = box.flavor.map((flav) => {
        if (flav) {
          return {
            nom: flav.nom,
          };
        }
      });
      return {
        ...box,
        aliment: aliment,
        flavor: flavor,
      };
    });

    res.send(`<pre>${JSON.stringify(camion, null, 1)}</pre>`);
    // Transformez vos données ici si nécessaire
  } catch (error) {
    res.status(500).send(`Erreur lors de la récupération des boîtes ${error}`);
  }
};