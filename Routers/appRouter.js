import { Router } from 'express';
import Express  from 'express';
import { resolve } from "path";
import { fileURLToPath } from 'url';
import path from 'path';

//import * as appController from '../Controllers/appController.js'
//import { GetConnexionPageCSS } from '../Controllers/appController.js';
import GetConnexionPage  from '../Controllers/appController.js';

const appRouter = Router();

appRouter.get("/",GetConnexionPage)

//Pas utilisée - ne fonctionne pas
//appRouter.get("/",GetConnexionPageCSS)


export default appRouter;