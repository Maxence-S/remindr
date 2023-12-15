//Récupération du routeur principal
import appRouter from './Routers/appRouter.js'


import Express  from 'express';
import session from 'express-session';
import Handlebars from 'handlebars';

//Importation Prisma
import { PrismaClient } from '@prisma/client';


//Initialisation Express
const app = Express();
const port = 3010;

app.use(Express.static('public'))

//Initialisation Handlebars
// Handlebars.create({
//   layoutsDir: resolve(__dirname, 'Template'), // Chemin des layouts à suivre
//   defaultLayout: false, // Définissez à false pour désactiver les mises en page
//   extname: '.hbs',
//   /* autres options de configuration */
// });

//Initialisation prisma
const prisma = new PrismaClient()

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(appRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

