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
const csrf = require('csurf');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const expressBasicAuth = require("express-basic-auth");
const path = require('path');
const dotenv = require("dotenv");
const morgan = require('morgan');
const port = 3000;

dotenv.config({ path: './env/dev.env' });

const forms = require('forms');
var fields = forms.fields;
const widgets = forms.widgets;
var validators = forms.validators;

app.set("view engine", "ejs");

const authOptionsAdmin = {
    users: { 'admin': 'admin' }, 
    challenge: true, 
};

const authOptions = {
    users: { 'boogie': 'boogie',
             'admin': 'admin'   
            }, 
    challenge: true, 
};

app.get('/', (req, res) => {
    res.render("index");
})


const csrfProtection = csrf({
    cookie: {
        key: '_csrf',
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    }
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: process.env.TODO_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrfProtection);

const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const logFilePath = path.join(logDirectory, 'todo.log');

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

app.use(morgan(':date[iso] [:method :url] :status - :response-time ms', { stream: logStream }));
app.set('logLevel', 'info');


const urlencodedparser = bodyParser.urlencoded({ extended: false });

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
        app.listen(port, () => {
            console.log(`Todo app listening on port ${port}`);
            webView();
        })
    })
    .help(true)
    .require(1, "Vous devez spécifier une commande")
    .argv;

//express views
function webView() {
    // Route publique accessible sans authentification
    app.get('/', (req, res) => {
        res.send('Route publique');
    });


    app.get('/list', expressBasicAuth(authOptions), (req, res) => {
        models.getAllTodo().then(rows => {
            res.render('list', { tasks: rows });
        });
    });

    app.get('/create', expressBasicAuth(authOptionsAdmin), (req, res) => {
        res.render('create', { csrfToken: req.csrfToken() });
    });



    app.post('/create', csrfProtection, expressBasicAuth(authOptionsAdmin), urlencodedparser, (req, res) => {
        var lComplete = false;

        if (req.body.complete == "on") {
            lComplete = true;
        }

        models.createTodo(req.body.task, lComplete, req.body.due);
        res.redirect('/list');
    });


    app.get('/delete', expressBasicAuth(authOptionsAdmin), (req, res) => {
        models.getAllTodo().then(rows => {
            res.render('delete', { tasks: rows, csrfToken: req.csrfToken() });
        });
    });

    app.post('/delete', expressBasicAuth(authOptionsAdmin), csrfProtection, urlencodedparser, (req, res) => {
        models.deleteTodo(req.body.task);
        res.redirect('/list');
    });

    app.get('/update', expressBasicAuth(authOptionsAdmin), (req, res) => {
        models.getAllTodo().then(rows => {
            res.render('update', { tasks: rows, csrfToken: req.csrfToken() });
        });
    });

    app.post('/update', expressBasicAuth(authOptionsAdmin), expressBasicAuth(authOptions), csrfProtection, urlencodedparser, (req, res) => {
        var id = req.body.task;
        res.redirect(`/update/form?id=${id}`);
    });


    app.get('/update/form', expressBasicAuth(authOptions), (req, res) => {
        models.getTodo(req.query.id).then(rows => {
            res.render('form', { todo: rows, csrfToken: req.csrfToken() });
        });
    });

    app.post('/update/form', expressBasicAuth(authOptions), csrfProtection, urlencodedparser, (req, res) => {
        req.body.complete = req.body.complete == "on" ? true : false;

        if (req.body.due == "") {
            req.body.due = undefined;
        }

        models.update(req.body.id, req.body.complete, req.body.due, req.body.task);

        res.redirect('/list');
    });

};
