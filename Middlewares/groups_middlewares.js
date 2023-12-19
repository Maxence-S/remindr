import { PrismaClient } from '@prisma/client';
import { CustomError } from '../Services/utils.js';

const prisma = new PrismaClient()

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

                await prisma.groups.update({
                    where: { G_id: idGroup },
                    data: {
                        Users: {
                            connect: { U_id: idUser },
                        },
                    },
                });
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


async function AddUserInGroup(req, res) {
    try {
        const email_user = req.body.email;
        const group_name = req.body.groupName;

        if (email_user) {
            if (!req.session.user) {
                throw new CustomError(2, 'Utilisateur non connecté');
            }

            // Vérifier si l'utilisateur existe
            const existingUser = await prisma.user.findUnique({
                where: { email: email_user },
            });

            // Récupération du groupe
            const groupName = await prisma.groups.findUnique({
                where : { email: group_name },
            });

            if (existingUser)
            {
                if (groupName)
                {
                    await prisma.groups.update({
                        where: { name: group_name },
                        data: {
                            Users: {
                                connect: { email: email_user },
                            },
                        },
                    });
                }
                else
                {
                    throw new CustomError(4,'Erreur avec le groupe.')
                }
            }
            else
            {
                throw new CustomError(3,'Utilisateur inexistant.')
            }
        }
        else {
            throw new CustomError(1, 'Formulaire incomplet.')
        }
    }
    catch {

    }
}


export const AddGroupMid = AddGroup
export const AddUserMid = AddUserInGroup