import path from 'path';
import { PrismaClient } from '@prisma/client';

import { getDirName } from '../Services/utils.js';
import { RegisterMid, LoginMid } from '../Middlewares/login_register.js';
import { AddGroupMid, AddUserMid } from '../Middlewares/groups_middlewares.js';
import { UserConnected } from '../Middlewares/isConnected.js';

const prisma = new PrismaClient()


//Fonction des pages inscription et connexion
function GetLoginPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/connexion_page.html"));
}

function GetRegisterPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/register.html"));
}


//Fonction des pages après connexion (dashboard, liste des groupes, liste des rappels)

function GetDashboardPage(req, res) {
  UserConnected(req,res)
  .then((user) => {
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/dashboard.html"));
  })

  .catch((error) => {
    console.log("Page d'accueil : " + error);
    res.redirect('/')
  })

}


function GetAllGroupsPage(req, res) {
  UserConnected(req,res)
  .then((user) => {
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/groupes.html"));
  })

  .catch((error) => {
    console.log("Page groupes : " + error);
    res.redirect('/')
  })
}


function GetRemindersPage(req, res) {
  UserConnected(req,res)
  .then((user) => {
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/file_rappel.html"));
  })

  .catch((error) => {
    console.log("Page rappels : " + error);
    res.redirect('/')
  })
}

// function GetOtherPage(req, res) {
//   res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/others.html"));
// }


function GetSingleGroupPage(req,res) {
  UserConnected(req,res)
  .then((user) => {
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/one_group.html"));
  })

  .catch((error) => {
    console.log("Page d'un groupe unique : " + error);
    res.redirect('/')
  })
}



//Fonction permettant l'ajout de groupes, la connexion et l'inscription

function TryLogin(req, res) {
  LoginMid(req, res)
    .then((user) => {
      req.session.user = user;
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.log(error);

      if (error.code === 1) {
        // Formulaire incomplet
      }
      else if (error.code === 2) {
        // Utilisateur non trouvé
      }
      else if (error.code === 3) {
        // Mot de passe incorrect
      }

    })
}

function TryRegister(req, res) {

  RegisterMid(req, res)
    .then((newUser) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);

      if (error.code === 1) {
        // Formulaire incomplet
      }
      else if (error.code === 2) {
        // Adresse email déjà utilisée
      }
      else if (error.code === 3) {
        // Confirmation du mot de passe incorrect
      }

    })
}

function TryAddGroup(req, res) {

  AddGroupMid(req, res)
    .then((newGroup) => {
      console.log(newGroup);
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.log(error);

      if (error.code === 1) {
        // Formulaire incomplet
      }
      else if (error.code === 2) {
        // Utilisateur non connecté
        res.redirect('/');
      }
      else if (error.code === 3) {
        // Groupe déjà existant
      }
      else if (error.code === 4) {
        // Erreur avec le groupe ou l'ajout du créateur dans le groupe
      }

    })
}

function TryAddUserInGroup(req,res) {
  AddUserMid(req,res)
  .then((groupUpdated) => {
    console.log(groupUpdated);
    res.redirect('/groups/' + groupUpdated.name);
  })
  .catch((error) => {
    console.log(error);

    if (error.code === 1) {
      // Formulaire incomplet
    }
    else if (error.code === 2) {
      // Utilisateur non connecté
      res.redirect('/');
    }
    else if (error.code === 3) {
      // Utilisateur inexistant
    }
    else if (error.code === 4) {
      // Erreur avec le groupe
    }
  })
}


//Fonctions permettant de se déconnecter
function Logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur à la déconnexion :", err);
    } 
    else 
    {
      res.redirect("/");  //On renvoie sur la page de connexion
    }
  })
}


// EXPORTS //

export {
  GetLoginPage,
  GetRegisterPage,
  GetDashboardPage,
  GetAllGroupsPage,
  GetSingleGroupPage,
  GetRemindersPage,
  TryLogin,
  TryRegister,
  TryAddGroup,
  TryAddUserInGroup,
  Logout
}