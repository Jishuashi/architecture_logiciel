class Todo{
    private id:number;
    private task:string;
    private completed:boolean;
    private due?:Date;
    

    /**
     * Crée un todo
     * @param id Id du todo
     * @param task Tache à réaliser
     * @param completed Si la tâche est terminée
     * @param due Date de fin de la tâche
     */
    constructor(id:number, task:string, completed:boolean, due?:Date){
        this.id = id;
        this.task = task;
        this.completed = completed;
        this.due = due;
    };

    /**
     * Permet de récupérer l'id du todo
     * @returns Id du todo
     */
    getID():number{
        return this.id;
    };
};

function createTodo(id:number, task:string, completed:boolean, due?:Date):Todo{
    const todo = new Todo(id, task, completed, due);
    return todo;
};

export default createTodo;
