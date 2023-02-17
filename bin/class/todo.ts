
/**
 * Classe Todo
 * @class Todo
 * @property {number} id Id du todo
 * @property {string} task Tache à réaliser
 * @property {boolean} complete Si la tâche est terminée
 * @property {Date} due Date de fin de la tâche
 * @method getID() Permet de récupérer l'id du todo
 * @method getTask() Permet de récupérer la tache à réaliser
 * @method getcomplete() Permet de récupérer si la tâche est terminée
 * @method getDue() Permet de récupérer la date de fin de la tâche
 * @constructor
 * @param {number} id Id du todo
 * @param {string} task Tache à réaliser
 * @param {boolean} complete Si la tâche est terminée
 * @param {Date} due Date de fin de la tâche
 * @returns {Todo} Todo
 * @example
 * const todo = new Todo(1, "Faire les courses", false, new Date());
 * console.log(todo.getID()); // Affiche 1
 * console.log(todo.getTask()); // Affiche "Faire les courses"
 * console.log(todo.getcomplete()); // Affiche false
 * console.log(todo.getDue()); // Affiche la date de fin de la tâche
 * @version 1.0.0
 * @since 1.0.0
 * @author Jishashi
 *
 */
class Todo{
    private id:number;
    private task:string;
    private complete:boolean;
    private due?:Date;
    

    /**
     * Crée un todo
     * @param id Id du todo
     * @param task Tache à réaliser
     * @param complete Si la tâche est terminée
     * @param due Date de fin de la tâche
     */
    constructor(id:number, task:string, complete:boolean, due?:Date){
        this.id = id;
        this.task = task;
        this.complete = complete;
        this.due = due;
    };

    /**
     * Permet de récupérer l'id du todo
     * @returns Id du todo
     */
    getID():number{
        return this.id;
    };


    /**
     * 
     * @returns Tache à réaliser
     */
    getTask():string{
        return this.task;
    };

    /**
     * 
     * @returns Si la tâche est terminée
     */
    getcomplete():boolean{
        return this.complete;
    };

    /**
     * 
     * @returns Date de fin de la tâche
     */
    getDue():Date | undefined{
        return this.due;
    }
};
