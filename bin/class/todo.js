"use strict";
exports.__esModule = true;

/**
 * Classe Todo
 * @class Todo
 * @property {number} id Id du todo
 * @property {string} task Tache à réaliser
 * @property {boolean} complete Si la tâche est terminée
 * @property {string} due Date de fin de la tâche
 * @method getID Permet de récupérer l'id du todo
 * @method getTask Permet de récupérer la tache à réaliser
 * @method getComplete Permet de récupérer si la tâche est terminée
 * @method getDue Permet de récupérer la date de fin de la tâche
 * @constructor Crée un todo
 * @param {number} id Id du todo
 * @param {string} task Tache à réaliser
 * @param {boolean} complete Si la tâche est terminée
 * @param {string} due Date de fin de la tâche
 * @returns {Todo} Todo
 * @example
 * const Todo = require("./class/todo");
 * const todo = new Todo(1, "Faire les courses", false, "2020-12-31");
 * console.log(todo.getID()); // Affiche 1
 * console.log(todo.getTask()); // Affiche "Faire les courses"
 * console.log(todo.getComplete()); // Affiche false
 * console.log(todo.getDue()); // Affiche "2020-12-31"
 * @author Jishuashi
 */
var Todo = /** @class */ (function () {
    /**
     * Crée un todo
     * @param id Id du todo
     * @param task Tache à réaliser
     * @param complete Si la tâche est terminée
     * @param due Date de fin de la tâche
     */
    function Todo(id, task, complete, due) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        this.due = due;
    };
    
    /**
     * Permet de récupérer l'id du todo
     * @returns Id du todo
     */
    Todo.prototype.getID = function () {
        return this.id;
    };

    /**
     * 
     * @returns Tache à réaliser
     */
    Todo.prototype.getTask = function(){
        return this.task;
    };

    /**
     * 
     * @returns Si la tâche est terminée
     */
    Todo.prototype.getComplete = function(){
        return this.complete;
    };

    Todo.prototype.getDue = function(){
        return this.due;
    };
    
    return Todo;
}());

module.exports = Todo;
