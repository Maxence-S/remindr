import { hash, compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../Services/utils.js';

const prisma = new PrismaClient()

async function Login(req, res) {
    try {
        const user_email = req.body.email;
        const user_password = req.body.password;

        if (user_email && user_password) {

            // Vérifiez si l'utilisateur existe
            const user = await prisma.user.findUnique({
                where: { email: user_email },
            });

            if (!user) {
                throw new CustomError(2,'Utilisateur non trouvé');
            }

            //Vérification du mot de passe
            const passwordMatch = await compare(user_password, user.password);

            if (!passwordMatch) {
                throw new CustomError(3,'Mot de passe incorrect');
            }

            // Authentification réussie
            return user;

        }
        else {
            throw new CustomError(1,'Formulaire icomplet');
        }


    } catch (error) {
        throw error;
    }
}

async function Register(req, res) {
    try {
        const u_pseudo = req.body.pseudo;
        const u_email = req.body.email;
        const u_password = req.body.password;
        const u_password2 = req.body.password2;

        if (u_pseudo && u_email && u_password && u_password2) 
        {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await prisma.user.findUnique({
                where: { email: u_email },
            });


            if (existingUser) {
                throw new CustomError(2,'Cette adresse email existe déjà');
            }

            if (u_password !== u_password2) {
                throw new CustomError(3,'La confirmation du mot de passe est incorrecte');
            }

            //Si l'utilisateur n'existe pas et que la password a bien été confirmé, on le chiffre.
            const hashedPassword = await hash(u_password, 10);

            //On crée l'utilisateur
            const newUser = await prisma.user.create({
                data: {
                    pseudo: u_pseudo,
                    email: u_email,
                    password: hashedPassword
                },
            });


            //L'utilisateur a bien été crée
            return newUser;
        }
        else
        {
            throw new CustomError(1,'Formulaire incomplet');
        }


    }
    catch (error) {
        throw error;
    }
}


export const LoginMid = Login
export const RegisterMid = Register