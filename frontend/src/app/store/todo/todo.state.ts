import { TodoModel } from "../model/todo.model";

export const TodoState: TodoModel = {
    list:[],
    errorMessage: "",
    todoObj:{
        id: 0,
        title: "",
        description: "",
        dueDate: new Date(0),
        isCompleted: false,
        created: new Date(0),
        lastUpdated: null
    }
}