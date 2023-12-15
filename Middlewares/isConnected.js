import { CustomError } from '../Services/utils.js';

async function UserConnected(req, res) {
    try {
        if (req.session.user) {
            return req.session.user;
        }
        else {
            throw new CustomError(1, "Utilisateur non connecté. Accès refusé");
        }
    }
    catch (error) {
        throw error;
    }
}

export {
    UserConnected
}
