//Récupération du routeur principal
import appRouter from './Routers/appRouter.js'


//Importation Express
import Express  from 'express';
import { resolve } from "path";
import path from 'path';
import { getDirName } from './Services/utils.js';

//Importation Handlebars
import * as handlebars from 'handlebars'

//Importation Prisma
import { PrismaClient } from '@prisma/client';


//Initialisation Express
const app = Express();
const port = 3010;

app.use(Express.static('static'));
app.use(Express.static('public'))


const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

app.use(appRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

