import path from 'path';
import { PrismaClient } from '@prisma/client';

import { getDirName } from '../Services/utils.js';
import { RegisterMid, LoginMid } from '../Middlewares/login_register.js';
import { UserConnected } from '../Middlewares/isConnected.js';
import { CreateReminder } from '../Middlewares/reminder_middleware.js';

const prisma = new PrismaClient()


//Fonction permettant de récupérer la page de connexion
function GetLoginPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/connexion_page.html"));
}

//Fonction permettant de récupérer la page d'inscription
function GetRegisterPage(req, res) {
  res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/register.html"));
}


//Fonction des pages après connexion (dashboard, liste des groupes, liste des rappels)

//Fonction envoyant la page principale
function GetDashboardPage(req, res) {
  UserConnected(req, res)
    .then(async (user) => {

      const pseudo = user.pseudo;
      const email = user.email;

      const User = await prisma.user.findUnique({
        where: { email },
        include: {
          U_Groups: {
            select: { name: true, Reminders: true },
            take: 6,
          }
        },
      });

      const groupsOfuser = User.U_Groups.map(Groups => Groups.name);
      const FirstsReminders = User.U_Groups.Reminders; //Marche pas pour l'instant
      res.render('dashboard', { pseudo, email, groupsOfuser, FirstsReminders });
    })

    .catch((error) => {
      console.log("Page d'accueil : " + error);
      res.redirect('/')
    })

}

//Fonction permettant d'afficher la page des rappels de l'utilisateur
function GetRemindersPage(req, res) {
  UserConnected(req, res)
    .then((user) => {
      res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/file_rappel.html"));
    })

    .catch((error) => {
      console.log("Page rappels : " + error);
      res.redirect('/')
    })
}


//Fonction permettant la connexion d'un utilisateur
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


//Fonction permettant l'inscription d'un nouvel utilisateur
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

//Fonction permettant d'ajouter un rappel
function TryAddReminder(req, res) {
  CreateReminder(req, res)
    .then((group) => {
      res.redirect('/groups/' + group.name);
    })
    .catch((error) => {
      console.log(error);

      if (error.code === 1) {
        // Utilisateur non connecté
      }
      else if (error.code === 2) {
        // Erreur avec le groupe
      }
      else if (error.code === 3) {
        // Erreur à la création du rappel
      }
    })
}


//Fonctions permettant de se déconnecter
function Logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur à la déconnexion :", err);
    }
    else {
      res.redirect("/");  //On renvoie sur la page de connexion
    }
  })
}


// EXPORTS //

export {
  GetLoginPage,
  GetRegisterPage,
  GetDashboardPage,
  GetRemindersPage,
  TryLogin,
  TryRegister,
  TryAddReminder,
  Logout
}