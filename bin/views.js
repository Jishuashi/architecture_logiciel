#! /usr/bin/env node
/**
 * @file views.js
 * @description Contient les fonctions de gestion des vues
 * @author Jishuashi
 * @version 1.0.0
 */
const yargs = require("yargs");
const models = require("./models");
const { usage } = require("yargs");
const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
})

app.use(express.static('public'));

const usageSTR = "\nUsage: todo <command> <options>";

use = yargs.usage(usageSTR);

const commands = yargs.command("create", "Ajoute une todo", (y) => {
    y.option('t', { alias: "task", describe: "Tache à rappeler", type: "string", demandOption: true });
    y.option('c', { alias: "complete", describe: "Si la tâche est terminer", type: "string", demandOption: false });
    y.option('d', { alias: "due", describe: "Echeance de la tache", type: "string", demandOption: false });
    return y;
}, (argv) => { models.createTodo(argv.task, argv.complete, argv.due) })
    .command("update", "Change les paramètre de todo", (y) => {
        y.option('i', { alias: "id", describe: "id de la Tache", type: "string", demandOption: true });
        y.option('t', { alias: "task", describe: "Tache à rappeler", type: "string", demandOption: false });
        y.option('c', { alias: "complete", describe: "Si la tâche est terminer", type: "string", demandOption: false });
        y.option('d', { alias: "due", describe: "Echeance de la tache", type: "string", demandOption: false });
        return y;
    }, (argv) => { models.update(argv.id, argv.complete, argv.due, argv.task) })
    .command("delete", "Supprime une todo", (y) => {
        y.option('i', { alias: "id", describe: "id de la Tache", type: "string", demandOption: true });
        return y;
    }, (argv) => { models.deleteTodo(argv.id) })
    .command("list", "List les todo", (y) => { }, (argv) => { models.list() })
    .command("initDB", "Init la table de la base de donnée", (y) => { }, (argv) => { models.initDatabase() })
    .command("deleteDB", "Delete la table de la base de donnée", (y) => { }, (argv) => { models.deleteDatabase() })
    .command("serv", "Lance le serveur", (y) => { }, (argv) => {
        app.listen(port, () => {console.log(`Todo app listening on port ${port}`)
        webView();
    })})
    .help(true)
    .require(1, "Vous devez spécifier une commande")
    .argv;

    //express views
    function webView(){
        app.get('/list', (req, res) => {   
        models.getAllTodo().then(rows => {
            res.render('list', {tasks: rows});
        });
    

    });
    };