const { boolean, option } = require("yargs");
const Todo = require("./class/todo");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({path: './env/dev.env'});

const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: process.env.TODO_DATABASE
    },
    useNullAsDefault: true
});


process.on('exit', code => { console.log(`Le process s'est arrêté avec le code: ${code}`) });
process.on('uncaughtException', ((err, origin) => { console.log(`UNCAUGTH_EXEPTION ${err}, Origin : ${origin}`) }));
process.on('unhandledRejection', ((reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason} \n ------ \n ${promise}`) }));
process.on('warning', ((...args) => { console.log(...args) }));

/**
 * Creé un todo et l'ajoute à la base de donnée
 * @param {string} pTask     Tache à réaliser
 * @param {boolean} pComplete  Si la tâche est terminée
 * @param {date} pDue    Date de fin de la tâche
 */
const createTodo = (pTask, pComplete, pDue) => {
    const knexCreate = require('knex')({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: process.env.TODO_DATABASE
        },
        useNullAsDefault: true
    });


    if (pDue === undefined) {
        var todo = new Todo(0, pTask, pComplete);
    } else {
        var todo = new Todo(0, pTask, pComplete, pDue);
    }

    if (todo.getComplete() === 'true') {
        todo.complete = true;
    } else {
        todo.complete = false;
    };


    knexCreate('todo').insert({ task: todo.getTask(), complete: todo.getComplete() ? 1 : 0, date: todo.getDue() + "" }).then((rows) => {
        console.log('Todo created');
    }).catch((err) => {
        console.log("Error CREATE: " + err);
    }).finally(() => {
        knexCreate.destroy();
    });
};

/**
 * Update un todo dans la base de donnée
 * @param {number} pId    Id du todo
 * @param {boolean} pComplete    Si la tâche est terminée (true/false) ou undefined
 * @param {date} pDue  Date de fin de la tâche ou undefined
 * @param {string} pTask     
 */
function update(pId, pComplete, pDue, pTask) {
    const knexUpdate = require('knex')({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: "./database/todo.db"
        },
        useNullAsDefault: true
    });

    knexUpdate('todo').where('id', pId).update({ complete:(pComplete != undefined) ? pComplete ? 0 : 1 : knex('todo').where('id', pId).select('complete') , date: (pDue != undefined) ? pDue : knex('todo').where('id', pId).select('date'), task: (pTask != undefined) ? pTask : knex('todo').where('id', pId).select('task')  }).then((rows) => {
        console.log('Todo updated');
    }).catch((err) => {
        console.log("Error UPDATE: " +err);
    }).finally(() => {
        knexUpdate.destroy();
    });
};   


/**
 * Supprime un todo de la base de donnée
 * @param {number} pId   Id du todo
 */
const deleteTodo = (pId) => {
    const knexDelete = require('knex')({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: "./database/todo.db"
        },
        useNullAsDefault: true
    });

    knexDelete('todo').where('id', pId).del().then((rows) => {
        console.log('Todo deleted');
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knexDelete.destroy();
    });
};

const list = () => {
  knex.select('*').from('todo').then((rows) => {
        for(let i = 0; i < rows.length; i++){
            
            if(rows[i].complete === 1){
                rows[i].complete = true;
            }else{
                rows[i].complete = false;
            }

            if(rows[i].date === null){
                rows[i].date = "Pas de date";
            }
        }

        console.table(rows);
    }).catch((err) => {
        console.log("Error CREATE: " +err);
    }).finally(() => {
        knex.destroy();
    });
};

const initDatabase = () => {
    knex.schema.createTable('todo', function(table) {
        table.increments('id').primary();
        table.string('task', 255).notNullable();
        table.boolean('complete').notNullable().defaultTo(false);
        table.string('date', 255).nullable();
      })
      .then(function() {
        console.log('Table created');
      })
      .catch(function(err) {
        console.log(err);
      }).finally(() => {
        knex.destroy();
    });
};

const deleteDatabase = () => {
    knex.schema.dropTable('todo').then(() => {
        console.log('Table deleted');
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knex.destroy();
    });
};

const getAllTodo = async () => {
    const knexAll = require('knex')({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: "./database/todo.db"
        },
        useNullAsDefault: true
    });


    return knexAll.select('*').from('todo').then((rows) => {
        for(let i = 0; i < rows.length; i++){
            
            if(rows[i].complete === 1){
                rows[i].complete = true;
            }else{
                rows[i].complete = false;
            }

            if(rows[i].date === null){
                rows[i].date = "Pas de date";
            }
        }
        return rows;
    }).catch((err) => {
        console.log("Error LISTALL: " + err + " " );
    }).finally(() => {
        knexAll.destroy();
    });
};

const getTodo = (id) => {
    const knexID = require('knex')({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: "./database/todo.db"
        },
        useNullAsDefault: true
    });

    return knexID.select('*').from('todo').where('id', id).then((rows) => {
        for(let i = 0; i < rows.length; i++){
        }
        return rows;
    }).catch((err) => {
        console.log("Error LISTALL: " + err + " " );
    }).finally(() => {
        knex.destroy();
    });
};


exports.getTodo = getTodo;
exports.getAllTodo = getAllTodo;
exports.createTodo = createTodo;
exports.update = update;
exports.deleteTodo = deleteTodo;
exports.initDatabase = initDatabase;
exports.deleteDatabase = deleteDatabase;
exports.list = list;