const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await prisma.box.findMany({
      include: {
        boxaliment: {
          include: {
            aliment: true,
          },
        },
        flavor: true,
      },
    });
    var camion = allBoxes.map(box => {
        const alim = box.boxaliment.map(alim => {
            const alim2 =  alim.aliment
            const quantity = alim.quantity
            return {
                name: alim2.nom,
                quantity: quantity
            }
        })
        const flavor = box.flavor
        const boxes = box.boxaliment
        res.status(404).send(`aliment ${alim}, flavor ${flavor}`)
        return {
            ...boxes,
            aliment: alim,
            flavor: flavor
        }
    })

    res.send(`<pre>${JSON.stringify(camion, null, 2)}</pre>`)
    // Transformez vos données ici si nécessaire

    
  } catch (error) {
    
    res.status(500).send("Erreur lors de la récupération des boîtes");
  }
};
