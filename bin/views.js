/* #! /usr/bin/env node */

const yargs = require("yargs");
const models = require("./models");
const { usage } = require("yargs");
const express = require("express");


const app = express();
  
/*app.listen(4000, () => {
  console.log(`Server is up and running on 4000 ...`);
}); */

const usageSTR = "\nUsage: todo <command> <options>";

use = yargs.usage(usageSTR);

/**
 * Creation des commandes de l'application todo
 * @command create : Ajoute une todo
 * @command update : Change les paramètre de todo
 * @command delete : Supprime une todo
 * @command list : List les todo
 * @command complete : Complete une todo
 * @command help : Affiche l'aide
 * @command version : Affiche la version
 * @command initDB : Initialise la base de donnée
 * @command deleteDB : Supprime la base de donnée
 */
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
    .help(true)
    .argv;



