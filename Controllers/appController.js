
function GetConnexionPage(req,res)
{
    res.sendFile(resolve(__dirname, '../Template/connexion_page.html'));
}