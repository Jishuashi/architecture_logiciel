#! /usr/bin/env node
const yargs = require("yargs");
const models = require("./models");
const { usage } = require("yargs");

const usageSTR = "\nUsage: todo <command> <options>";

use = yargs.usage(usageSTR);

const commands = yargs.command("create", "Ajoute une todo", (y) => {
    y.option('t', { alias: "task", describe: "Tache à rappeler", type: "string", demandOption: true });
    y.option('d', { alias: "due", describe: "Echeance de la tache", type: "string", demandOption: false });
    return y;
}, (argv) => { models.createTodo(argv.task, argv.due) })
    .command("complete", "Marque une todo comme terminée", (y) => {
        y.option('i', { alias: "id", describe: "id de la Tache", type: "string", demandOption: true });
        return y;
    }, (argv) => { models.complete(argv.id) })
    .command("delete", "Supprime une todo", (y) => {
        y.option('i', { alias: "id", describe: "id de la Tache", type: "string", demandOption: true });
        return y;
    }, (argv) => { models.deleteTodo(argv.id) })
    .command("list", "List les todo", (y) => { }, (argv) => { models.list() })
    .help(true)
    .argv;



