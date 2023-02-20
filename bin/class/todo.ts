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
