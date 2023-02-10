#! /usr/bin/env node
const yargs = require("yargs");
const utils = require('./utils.js')
const todo = require('./class/todo');

const usage = "\nUsage: todo <command> <options>";

options = yargs.usage(usage)
    .command("create", "Ajoute une todo")
    .command("list", "Liste les todos")
    .command("complete", "Marque une todo comme terminée")
    .command("delete", "Supprime une todo")  
    .option("t", { alias: "task", describe: "Récupere la tâche", type: "string", demandOption: true })
    .option("id", { alias: "id", describe: "", type: "string", demandOption: true })
    .option("c", { alias: "complete", describe: "Crée une todo", type: "string", demandOption: true })
    .option("d", { alias: "due", describe: "Crée une todo", type: "string", demandOption: true })
    .help(true)
    .argv;

    

