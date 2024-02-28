const express = require('express');
const path = require('path');
const ejs = require('ejs')
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allBoxes = await prisma.box.findMany();
  const aliment = await prisma.aliment.findMany();
  const html = ejs.renderFile(path.join(__dirname, 'views', 'box.html'), { allBoxes });
  app.get('/', (req, res)=> {
    const data = {
      allBoxes,
      aliment,
    };
    res.render('box', { allBoxes, aliment });
  });
  console.log(allBoxes, aliment);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
    app.listen(3000, () => {
      console.log("Serveur à l'écoute");
    });
  });