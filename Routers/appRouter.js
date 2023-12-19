import { Router } from 'express';
import bodyParser from 'body-parser';

import { GetLoginPage,GetRegisterPage, GetDashboardPage, GetAllGroupsPage, GetSingleGroupPage, GetRemindersPage, TryLogin,TryRegister, TryAddGroup, Logout } from '../Controllers/appController.js';
import { urlencodedParser } from '../Middlewares/bodyparser.js';

const appRouter = Router();


//Routes menant aux pages connexion et inscription
appRouter.get("/",GetLoginPage)                 //Page de connexion. C'est la page de base sur lequel l'utilisateur tombe.

appRouter.get("/register.html",GetRegisterPage) //Page d'inscription.


//Page visibles après login
appRouter.get('/dashboard',GetDashboardPage)    //Page d'accueil

appRouter.get('/groups', GetAllGroupsPage)         //Page listant les groupes de l'utilisateur

appRouter.get('/reminders', GetRemindersPage)   //Page listant les rappels de l'utilisateur



//Envoi des formulaires (inscription, connexion, création de groupe ou de rappel)
appRouter.post('/login',urlencodedParser,TryLogin)

appRouter.post('/register',urlencodedParser,TryRegister)

appRouter.post('/addGroup',urlencodedParser,TryAddGroup)


//Permet d'afficher la page d'un groupe

appRouter.get('/groups/:groupName',GetSingleGroupPage)


//Permet la fin de session et la déconnexion
appRouter.get('/logout',Logout)


export default appRouter;