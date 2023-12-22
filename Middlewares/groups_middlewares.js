import { PrismaClient } from '@prisma/client';
import { CustomError } from '../Services/utils.js';

const prisma = new PrismaClient()

//Fonction permettant de créer un groupe
async function AddGroup(req, res) {
    try {
        const group_name = req.body.groupName;

        if (group_name) {
            if (!req.session.user) {
                throw new CustomError(2, 'Utilisateur non connecté');
            }

            // Vérifier si le groupe existe déjà
            const existingGroup = await prisma.groups.findUnique({
                where: { name: group_name },
            });


            if (existingGroup) {
                throw new CustomError(3, 'Ce groupe existe déjà');
            }

            //On crée le groupe
            const newGroup = await prisma.groups.create({
                data: {
                    name: group_name,
                },
            });

            if (newGroup) {
                //On rajoute le créateur dans son groupe
                const idUser = req.session.user.U_id
                const idGroup = newGroup.G_id

                const groupUpdated = await prisma.groups.update({
                    where: { G_id: idGroup },
                    data: {
                        Users: {
                            connect: { U_id: idUser },
                        },
                    },
                });

                return groupUpdated;
            }
            else {
                throw new CustomError(4, 'Erreur dans la création du groupe, ajout de l\'utilisateur impossible');
            }



            //L'utilisateur a bien été crée
            return newGroup;
        }
        else {
            throw new CustomError(1, 'Formulaire incomplet');
        }


    }
    catch (error) {
        throw error;
    }
}

//Fonction permettant d'ajouter un utilisateur dans un groupe
async function AddUserInGroup(req, res) {   
    try {
        const email_user = req.body.email;
        const group_name = req.body.NameGroup;

        if (email_user) {
            if (!req.session.user) {
                throw new CustomError(2, 'Utilisateur non connecté');
            }

            // Vérifier si l'utilisateur existe
            const existingUser = await prisma.user.findUnique({
                where: { email: email_user },
            });

            // Récupération du groupe
            const group = await prisma.groups.findUnique({
                where: { name: group_name },
                include: { Users: true },
            });

            if (existingUser) {     //Si l'utilisateur existe, on va pouvoir l'ajouter
                if (group) {
                    const IsInGroup = group.Users.some(groupUser => groupUser.email === email_user);    //Vérifie que celui-ci n'est pas déjà dans le groupe
                    console.log(IsInGroup);
                    if (IsInGroup) {
                        throw new CustomError(5, 'Utilisateur déjà dans le groupe.')
                    }
                    else {
                        await prisma.groups.update({
                            where: { name: group_name },
                            data: {
                                Users: {
                                    connect: { email: email_user },
                                },
                            },
                        });

                        return group;
                    }

                }
                else {
                    throw new CustomError(4, 'Erreur avec le groupe.')
                }
            }
            else {
                throw new CustomError(3, 'Utilisateur inexistant.')
            }
        }
        else {
            throw new CustomError(1, 'Formulaire incomplet.')
        }
    }
    catch (error) {
        throw error;
    }
}

//Fonction permettant de vérifier qu'un utilisateur ait l'autorisation d'accéder à un groupe
async function GroupControlAccess(req, res) {
    try {
        const NameGroup = req.params.groupName;

        const Group = await prisma.groups.findUnique({
            where: { name: NameGroup },
        });

        if (Group) {
            const email = req.session.user.email;

            const User = await prisma.user.findUnique({
                where: { email },
                include: {
                    U_Groups: { select: { name: true } }
                }
            });
            const groupsOfuser = User.U_Groups.map(Groups => Groups.name);

            var AccessToGroup;
            groupsOfuser.forEach(Usergroup => {     //Vérifie chaque groupe de l'utilisateur

                if (Usergroup == Group.name) {
                    AccessToGroup = Group;
                }

            });

            if (AccessToGroup) {
                return;         //Si le groupe a été trouvé parmis ceux de l'utilisateur, on return pour passer à la suite
            }
            else {
                throw new CustomError(2, 'Accès interdit.')
            }



        }
        else {
            throw new CustomError(1, 'Groupe inexistant.')
        }
    }
    catch (error) {
        throw error;
    }
}

// EXPORTS //

export {
    AddGroup,
    AddUserInGroup,
    GroupControlAccess
}