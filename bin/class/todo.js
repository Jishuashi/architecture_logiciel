"use strict";
exports.__esModule = true;
var Todo = /** @class */ (function () {
    /**
     * Crée un todo
     * @param id Id du todo
     * @param task Tache à réaliser
     * @param completed Si la tâche est terminée
     * @param due Date de fin de la tâche
     */
    function Todo(id, task, completed, due) {
        this.id = id;
        this.task = task;
        this.completed = completed;
        this.due = due;
    };
    
    /**
     * Permet de récupérer l'id du todo
     * @returns Id du todo
     */
    Todo.prototype.getID = function () {
        return this.id;
    };
    
    return Todo;
}());

function createTodo(id, task, completed, due) {
    var todo = new Todo(id, task, completed, due);
    return todo;
};

exports["createTodo"] = createTodo;
