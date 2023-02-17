const { boolean, option } = require("yargs");
const Todo = require("./class/todo");
const fs = require("fs");

const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./database/todo.db"
    },
    useNullAsDefault: true
});

const createTodo = (pTask, pComplete, pDue) => {

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


    knex('todo').insert({ task: todo.getTask(), complete: todo.getComplete() ? 1 : 0, date: todo.getDue() }).then((rows) => {
        console.log('Todo created');
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        knex.destroy();
    });
};

function update(pId) {
    console.log("complete --> " + pId);
}

const deleteTodo = (pId) => {
    console.log("delete --> " + pId);
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
        console.log(err);
    }).finally(() => {
        knex.destroy();
    });
};

const initDatabase = () => {
    knex.schema.createTable('todo', function(table) {
        table.increments('id').primary();
        table.string('task', 255).notNullable();
        table.boolean('complete').notNullable().defaultTo(false);
        table.date('date').nullable();
      })
      .then(function() {
        console.log('Table created successfully');
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
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

exports.createTodo = createTodo;
exports.update = update;
exports.deleteTodo = deleteTodo;
exports.initDatabase = initDatabase;
exports.deleteDatabase = deleteDatabase;
exports.list = list;