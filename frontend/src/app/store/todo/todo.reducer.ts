import { createReducer, on } from '@ngrx/store';
import { addTodoSuccess, loadTodoFail, loadTodoSuccess } from './todo.action';
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
  })
);

export function TodoReducer(state: any, action: any) {
  return _TodoReducer(state, action);
}
