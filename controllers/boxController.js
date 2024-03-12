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

    res.send(JSON.stringify(camion, null, 2));
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

exports.deleteBox = async(req, res)=>{
  try {
    const idBox = parseInt(req.body.idBox);

    const deleteAliment = prisma.aliment.deleteMany({
      where:{
        idBox: idBox
      }
    });


    const deleteFlavor = prisma.flavor.deleteMany({
      where:{
        idBox: idBox
      }
    });

    const deleteBox = prisma.box.delete({
      where:{
        idBox: idBox
      }
    });

    const deleteAll =  await prisma.$transaction([deleteAliment, deleteFlavor, deleteBox]);

    res.status(200).json(deleteAll);    
  } catch (error) {
    res.status(500).send(`Erreur lors de la suppression de la boîte : ${error.message}`);
  }
}

exports.updateBox = async(req, res)=>{
  try {
    const { idBox, name, pieces, price, image } = req.body;

    const updateBox = await prisma.box.update({
      where: {
        idBox: idBox
      },
      data: {
        name: name,
        pieces: pieces,
        price: price,
        image: image
      }
    });
    res.status(200).json(updateBox);
  } catch (error) {
    res.status(500).send(`Erreur lors de la modification de la boîte : ${error.message}`);
  }
}