import { createAction, props } from "@ngrx/store";
import { Todo } from "../model/todo.model";

export const LOAD_TODO = '[todo page] load todo'
export const LOAD_TODO_SUCCESS = '[todo page] load todo success'
export const LOAD_TODO_FAIL = '[todo page] load todo fail'
export const ADD_TODO = '[todo page] add todo'
export const ADD_TODO_SUCCESS = '[todo page] update todo success'
export const UPDATE_TODO = '[todo page] add todo'
export const UPDATE_TODO_SUCCESS = '[todo page] update todo success'
export const GET_TODO = '[todo page] get todo'
export const GET_TODO_SUCCESS = '[todo page] get todo success'
export const OPEN_POPUP = '[todo page] open popup'
export const DELETE_TODO = '[todo page] delete todo'
export const DELETE_TODO_SUCCESS = '[todo page] delete todo success'


export const loadTodo = createAction(LOAD_TODO)
export const loadTodoSuccess = createAction(LOAD_TODO_SUCCESS, props<{list: Todo[]}>())
export const loadTodoFail = createAction(LOAD_TODO_FAIL, props<{errorMessage: string}>())

export const addTodo = createAction(ADD_TODO, props<{inputData: Todo}>())
export const addTodoSuccess = createAction(ADD_TODO_SUCCESS, props<{inputData: Todo}>())

export const updateTodo = createAction(UPDATE_TODO, props<{inputData: Todo}>())
export const updateTodoSuccess = createAction(UPDATE_TODO_SUCCESS, props<{inputData: Todo}>())

export const deleteTodo = createAction(DELETE_TODO, props<{id: number}>())
export const deleteTodoSuccess = createAction(DELETE_TODO_SUCCESS, props<{id: number}>())

export const getTodo = createAction(GET_TODO, props<{id: number}>())
export const getTodoSuccess = createAction(GET_TODO_SUCCESS, props<{obj: Todo}>())

export const openPopup = createAction(OPEN_POPUP)