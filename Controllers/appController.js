import path from 'path';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';

import { getDirName } from '../Services/utils.js';
import { RegisterMid, LoginMid } from '../Middlewares/login_register.js';
import { UserConnected } from '../Middlewares/isConnected.js';

const prisma = new PrismaClient()

function GetLoginPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/connexion_page.html"));
}

function GetRegisterPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/register.html"));
}

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

function GetGroupsPage(req, res) {
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
    console.log("Page reminders : " + error);
    res.redirect('/')
  })
}

// function GetOtherPage(req, res) {
//   res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/others.html"));
// }

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
// export const GetLogin = GetLoginPage 
// export const GetRegister = GetRegisterPage
// export const TryLoginFunction = TryLogin
// export const TryRegisterFunction = TryRegister

export {
  GetLoginPage,
  GetRegisterPage,
  GetDashboardPage,
  GetGroupsPage,
  GetRemindersPage,
  TryLogin,
  TryRegister,
  Logout
}