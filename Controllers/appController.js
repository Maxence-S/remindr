import Express  from 'express';
import { resolve } from "path";
import { fileURLToPath } from 'url';
import path from 'path';
import { getDirName } from '../Services/utils.js';


function GetConnexionPage(req,res)
{
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/connexion_page.html"));
}

function GetRegisterPage(req,res)
{
    res.sendFile(path.join(getDirName(import.meta.url), "../remindr/Template/connexion/register.html"));
}

export default GetConnexionPage
export const GetRegister = GetRegisterPage