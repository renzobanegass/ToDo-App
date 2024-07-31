import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoModel } from "../model/todo.model";

const getTodoState = createFeatureSelector<TodoModel>('todo')

export const getTodoList = createSelector(getTodoState, (state) => {
    return state.list;
})