import { PrismaClient } from '@prisma/client';
import { CustomError } from '../Services/utils.js';

const prisma = new PrismaClient()


//Fonction permettant de créer un nouveau rappel dans un groupe
async function CreateReminder(req, res) {
    try {
        const { title, datetime, description, color, NameGroup } = req.body

        if (!req.session.user) {
            throw new CustomError(1, 'Utilisateur non connecté');
        }

        else {
            const group = await prisma.groups.findUnique({
                where: { name: NameGroup },
            });

            if (group) {

                var formatedDatetime = datetime;
                formatedDatetime = formatedDatetime.replace('T',' ');
                formatedDatetime = formatedDatetime.concat(":00");           
                const newReminder = await prisma.reminder.create({
                    data: {
                        GroupId: group.G_id,
                        Name: title,
                        Description: description,
                        DueDate: formatedDatetime,
                        Color: color
                    }

                });

                if (newReminder) {
                    return group;
                }
                else {
                    throw new CustomError(3, 'Erreur à la création du rappel.');
                }
            }
            else {
                throw new CustomError(2, 'Erreur avec le groupe.');
            }
        }
    }
    catch (error) {
        throw error;
    }


}

export { CreateReminder }