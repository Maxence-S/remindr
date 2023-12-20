
import { PrismaClient } from '@prisma/client';
import { AddGroup, AddUserInGroup, GroupControlAccess } from '../Middlewares/groups_middlewares.js';
import { UserConnected } from '../Middlewares/isConnected.js';

const prisma = new PrismaClient()


//Fonction permettant d'afficher la page des groupes d'un utilisateur
function GetAllGroupsPage(req, res) {
    UserConnected(req, res)
        .then(async (user) => {

            const email = user.email;

            const User = await prisma.user.findUnique({
                where: { email },
                include: {
                    U_Groups: { select: { name: true } }
                }
            });

            const groupsOfuser = User.U_Groups.map(Groups => Groups.name);
            res.render('groupes', { groupsOfuser });
        })

        .catch((error) => {
            console.log("Page groupes : " + error);
            res.redirect('/')
        })
}



//Fonction permettant l'accès à la page d'un groupe
function GetSingleGroupPage(req, res) {
    UserConnected(req, res)
        .then((user) => {

            GroupControlAccess(req, res)
                .then(async () => {
                    const NameGroup = req.params.groupName

                    const group = await prisma.groups.findUnique({
                        where: { name: NameGroup },
                    })

                    const Reminders = await prisma.reminder.findMany({
                        where: { GroupId: group.G_id },
                        orderBy: [
                            {
                                DueDate: 'asc',
                            },
                        ],
                    });
                    res.render('one_group', { NameGroup, Reminders });
                })
                .catch((error) => {
                    console.log("Page du groupe '" + req.params.groupName + "' : " + error);
                    res.redirect('/dashboard');
                })


        })

        .catch((error) => {
            // Utilisateur non connecté
            console.log("Page d'un groupe unique : " + error);
            res.redirect('/')
        })
}

//Fonction permettant de créer un groupe
function TryAddGroup(req, res) {

    AddGroup(req, res)
        .then((newGroup) => {
            res.redirect('/groups/' + newGroup.name);
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

//Fonction permettant d'ajouter un utilisateur dans un groupe
function TryAddUserInGroup(req, res) {
    AddUserInGroup(req, res)
        .then((groupUpdated) => {
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

// EXPORTS //

export {
    GetAllGroupsPage,
    GetSingleGroupPage,
    TryAddGroup,
    TryAddUserInGroup
}