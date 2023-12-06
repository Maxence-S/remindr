import { app } from "../index"
const appController = require('../Controllers/appController');

app.get("/",appController.GetConnexionPage)