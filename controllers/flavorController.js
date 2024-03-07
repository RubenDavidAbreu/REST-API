const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateFlavor = async(req, res)=>{
    try {
      const { idFlavor, name } = req.body;
  
      const updateFlavor = await prisma.flavor.update({
        where: {
          idFlavor: idFlavor
        },
        data: {
          name: name
        }
      });
      res.status(200).json(updateFlavor);
    } catch (error) {
      res.status(500).send(`Erreur lors de la modification de la boîte : ${error.message}`);
    }
}