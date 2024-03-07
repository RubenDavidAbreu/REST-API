const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateAliment = async(req, res)=>{
    try {
      const { idAliment, name, quantity } = req.body;
  
      const updateAliment = await prisma.aliment.update({
        where: {
          idAliment: idAliment
        },
        data: {
          name: name,
          quantity: quantity
        }
      });
      res.status(200).json(updateAliment);
    } catch (error) {
      res.status(500).send(`Erreur lors de la modification de la boîte : ${error.message}`);
    }
}