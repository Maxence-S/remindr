import { Router } from 'express';
import bodyParser from 'body-parser';

import { GetLoginPage,GetRegisterPage, GetDashboardPage, GetGroupsPage, GetRemindersPage, TryLogin,TryRegister, Logout } from '../Controllers/appController.js';


const appRouter = Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })   //Middleware bodyParser --> A mettre dans un fichiers bodyParser.js et l'importer ici

//Routes menant aux principales pages
appRouter.get("/",GetLoginPage)                 //Page de connexion. C'est la page de base sur lequel l'utilisateur tombe.

appRouter.get("/register.html",GetRegisterPage) //Page d'inscription.

appRouter.get('/dashboard',GetDashboardPage)    //Page d'accueil

appRouter.get('/groups', GetGroupsPage)         //Page listant les groupes de l'utilisateur

appRouter.get('/reminders', GetRemindersPage)   //Page listant les rappels de l'utilisateur

//Envoi des formulaires (inscription, connexion, création de groupe ou de rappel)
appRouter.post('/login',urlencodedParser,TryLogin)

appRouter.post('/register',urlencodedParser,TryRegister)



//Permet la fin de session et la déconnexion
appRouter.get('/logout',Logout)


export default appRouter;