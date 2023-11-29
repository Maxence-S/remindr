const express = require('express');
const { resolve } = require('path');

//Importation Handlebars
const handlebars = require('handlebars');

//Initialisation Express
const app = express();
const port = 3010;

app.use(express.static('static'));

//Import et init Prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB