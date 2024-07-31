import { createAction, props } from "@ngrx/store";
import { Todo } from "../model/todo.model";

export const LOAD_TODO = '[todo page] load todo'
export const LOAD_TODO_SUCCESS = '[todo page] load todo success'
export const LOAD_TODO_FAIL = '[todo page] load todo fail'

export const loadTodo = createAction(LOAD_TODO)
export const loadTodoSuccess = createAction(LOAD_TODO_SUCCESS, props<{list: Todo[]}>())
export const loadTodoFail = createAction(LOAD_TODO_FAIL, props<{errorMessage: string}>())