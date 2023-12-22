import { Router } from 'express';

import { GetLoginPage, GetRegisterPage, GetDashboardPage, GetRemindersPage, TryLogin, TryRegister, TryAddReminder, Logout } from '../Controllers/appController.js';
import { TryAddGroup, TryAddUserInGroup } from '../Controllers/groupsController.js';
import { urlencodedParser } from '../Middlewares/bodyparser.js';

const appRouter = Router(); //Initialisation du routeur


//Routes menant aux pages connexion et inscription
appRouter.get("/",GetLoginPage)                 //Page de connexion. C'est la page de base sur lequel l'utilisateur tombe.

appRouter.get("/register.html",GetRegisterPage) //Page d'inscription.


//Page visibles après login
appRouter.get('/dashboard',GetDashboardPage)    //Page d'accueil

appRouter.get('/reminders', GetRemindersPage)   //Page listant les rappels de l'utilisateur

//La route /groups est gérée par le routeur groupRouter. Elle n'apparait donc pas ici


//Envoi des formulaires (inscription, connexion, création de groupe ou de rappel)

appRouter.post('/login',urlencodedParser,TryLogin)                  //Récupère le formulaire de connexion d'un utilisateur

appRouter.post('/register',urlencodedParser,TryRegister)            //Récupère le formulaire d'ajout d'un utilisateur

appRouter.post('/addGroup',urlencodedParser,TryAddGroup)            //Récupère le formulaire d'ajout d'un groupe

appRouter.post('/addUser', urlencodedParser,TryAddUserInGroup)      //Récupère le formulaire d'ajout d'un utilisateur dans un groupe

appRouter.post('/addReminder', urlencodedParser, TryAddReminder)    //Récupère le formulaire de création d'un rappel

//Permet la fin de session et la déconnexion
appRouter.get('/logout',Logout)


export default appRouter;