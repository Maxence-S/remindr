import path from 'path'
import { fileURLToPath } from 'url'

//la variable globale __dirname n'est pas utilisable car nous utilisons ES module à la place de CommonJS.
//Cette fonction permet donc de renvoyer __dirname
const getDirName = function (moduleUrl) {
    const __filename = fileURLToPath(moduleUrl);
    const __dirname = path.dirname(__filename);
    return path.dirname(__dirname)
}

//Classe d'erreur personnalisée
class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'CustomError';
        this.code = code; // Entier associé à l'erreur
    }
}


export {
    getDirName,
    CustomError
}