import { Router } from 'express';
import { GetAllGroupsPage, GetSingleGroupPage } from '../Controllers/appController.js';

const groupRouter = Router();


groupRouter.get('/', GetAllGroupsPage)         //Page listant les groupes de l'utilisateur

//Permet d'afficher la page d'un groupe
groupRouter.get('/:groupName',GetSingleGroupPage)

export default groupRouter;