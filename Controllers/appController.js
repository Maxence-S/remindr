import Express  from 'express';
import { resolve } from "path";
import { fileURLToPath } from 'url';
import path from 'path';
import { getDirName } from '../Services/utils.js';


function GetConnexionPage(req,res)
{
    //PROBLEME : Envoi la page html...mais sans CSS.
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/connexion_page.html"));
    //res.sendFile(resolve(__dirname, "../Template/style/style_connexion.css"));

}

//N'est pas utilisée - ne fonctionne pas pour l'instant
function GetConnexionPageCSS(req,res)
{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    res.sendFile(resolve(__dirname, "../Template/connexion/connexion_page.html"));
    res.sendFile(resolve(__dirname, "../Template/style/style_connexion.css"));

    res.sendFile(resolve(__dirname, "../Template/style/style_connexion.css"));

}

export default GetConnexionPage
export { GetConnexionPageCSS };