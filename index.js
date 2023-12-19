//Récupération du routeur principal
import appRouter from './Routers/appRouter.js'
import groupRouter from './Routers/groupRouter.js';

import { getDirName } from './Services/utils.js';


import Express  from 'express';
import { resolve } from 'path';
import session from 'express-session';
import Handlebars from 'express-handlebars';

//Importation Prisma
import { PrismaClient } from '@prisma/client';

//Initialisation Express
const app = Express();
const port = 3010;

app.use(Express.static('public'))

//Initialisation Handlebars
const hbs = Handlebars.create({
  layoutsDir: resolve(getDirName(import.meta.url), 'Template'), // Chemin des layouts à suivre
  defaultLayout: false, // Définissez à false pour désactiver les mises en page
  extname: '.hbs',
});

app.set('views', resolve(getDirName(import.meta.url), 'remindr/Template'));

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Initialisation prisma
const prisma = new PrismaClient()

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(appRouter);
app.use('/groups',groupRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

