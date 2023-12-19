import { Router } from 'express';

import { GetLoginPage,GetRegisterPage, GetDashboardPage, GetAllGroupsPage, GetRemindersPage, TryLogin,TryRegister, TryAddGroup, Logout } from '../Controllers/appController.js';
import { urlencodedParser } from '../Middlewares/bodyparser.js';

const appRouter = Router();


//Routes menant aux pages connexion et inscription
appRouter.get("/",GetLoginPage)                 //Page de connexion. C'est la page de base sur lequel l'utilisateur tombe.

appRouter.get("/register.html",GetRegisterPage) //Page d'inscription.


//Page visibles après login
appRouter.get('/dashboard',GetDashboardPage)    //Page d'accueil

appRouter.get('/reminders', GetRemindersPage)   //Page listant les rappels de l'utilisateur

//La route /groups est gérée par le routeur groupRouter. Elle n'apparait donc pas ici


//Envoi des formulaires (inscription, connexion, création de groupe ou de rappel)
appRouter.post('/login',urlencodedParser,TryLogin)

appRouter.post('/register',urlencodedParser,TryRegister)

appRouter.post('/addGroup',urlencodedParser,TryAddGroup)



//Permet la fin de session et la déconnexion
appRouter.get('/logout',Logout)


export default appRouter;