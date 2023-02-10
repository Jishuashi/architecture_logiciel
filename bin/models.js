const Todo = require("./class/todo");

const createTodo = (pTask, pDue) => {

    if (pDue === undefined){
        var todo = new Todo(Math.floor(Math.random() * 1000), pTask, false);
    }else{
        var todo = new Todo(Math.floor(Math.random() * 1000), pTask, false, pDue);
    }

    console.log(todo);
};

const complete = (pId) => {
    console.log("complete --> " + pId);
};

const deleteTodo = (pId) => {
    console.log("delete --> " + pId);
};

const list = () => {
    console.log("list");
};


exports.createTodo = createTodo;
exports.complete = complete;
exports.deleteTodo = deleteTodo;
exports.list = list;