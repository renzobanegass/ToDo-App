import { createReducer, on } from '@ngrx/store';
import {
  addTodoSuccess,
  deleteTodoSuccess,
  getTodoSuccess,
  loadTodoFail,
  loadTodoSuccess,
  openPopup,
  updateTodoSuccess,
} from './todo.action';
import { TodoState } from './todo.state';

const _TodoReducer = createReducer(
  TodoState,
  on(loadTodoSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(getTodoSuccess, (state, action) => {
    return {
      ...state,
      todoObj: action.obj,
      errorMessage: '',
    };
  }),
  on(loadTodoFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(addTodoSuccess, (state, action) => {
    const _maxId = Math.max(...state.list.map((o) => o.id));
    const _newData = { ...action.inputData };
    _newData.id = _maxId + 1;
    return {
      ...state,
      list: [...state.list, _newData],
      errorMessage: '',
    };
  }),
  on(updateTodoSuccess, (state, action) => {
    const _newData = state.list.map((o) => {
      return o.id === action.inputData.id ? action.inputData : o;
    })    
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  }),
  on(deleteTodoSuccess, (state, action) => {
    const _newData = state.list.filter(o=>o.id !== action.id)
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  }),
  on(openPopup, (state, action) => {
    return {
      ...state,
      todoObj: {
        id: 0,
        title: '',
        description: '',
        dueDate: new Date(0),
        isCompleted: false,
        created: new Date(0),
        lastUpdated: null,
      },
    };
  })
);

export function TodoReducer(state: any, action: any) {
  return _TodoReducer(state, action);
}
