import { createReducer, on } from "@ngrx/store";
import { loadTodoFail, loadTodoSuccess } from "./todo.action";
import { TodoState } from "./todo.state";

const _TodoReducer = createReducer(TodoState,
    on(loadTodoSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),
    on(loadTodoFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    })
)

export function TodoReducer(state: any, action:any){
    return _TodoReducer(state, action);
}