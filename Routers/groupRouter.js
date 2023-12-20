import { Router } from 'express';
import { GetAllGroupsPage, GetSingleGroupPage } from '../Controllers/groupsController.js';

const groupRouter = Router();


groupRouter.get('/', GetAllGroupsPage)              //Page listant les groupes de l'utilisateur

groupRouter.get('/:groupName',GetSingleGroupPage)   //Permet d'afficher la page d'un groupe


export default groupRouter;