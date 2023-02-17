"use strict";
exports.__esModule = true;
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
