import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/service/todo.service';
import {
  addTodo,
  addTodoSuccess,
  deleteTodo,
  deleteTodoSuccess,
  getTodo,
  getTodoSuccess,
  loadTodo,
  loadTodoFail,
  loadTodoSuccess,
  updateTodo,
  updateTodoSuccess,
} from './todo.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../common/app.action';

@Injectable()
export class TodoEffects {
  constructor(private action$: Actions, private service: TodoService) {}

  _loadTodo = createEffect(() =>
    this.action$.pipe(
      ofType(loadTodo),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadTodoSuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadTodoFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );

  _getTodo = createEffect(() =>
    this.action$.pipe(
      ofType(getTodo),
      exhaustMap((action) => {
        return this.service.GetById(action.id).pipe(
          map((data) => {
            return getTodoSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to fetch todo data' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addTodo = createEffect(() =>
    this.action$.pipe(
      ofType(addTodo),
      switchMap((action) => {
        return this.service.Create(action.inputData).pipe(
          switchMap((data) => {
            return of(
              addTodoSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Created successfully.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to create todo',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateTodo = createEffect(() =>
    this.action$.pipe(
      ofType(updateTodo),
      switchMap((action) => {
        return this.service.Update(action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateTodoSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Updated successfully.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to update todo',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteTodo = createEffect(() =>
    this.action$.pipe(
      ofType(deleteTodo),
      switchMap((action) => {
        return this.service.Delete(action.id).pipe(
          switchMap((data) => {
            return of(
              deleteTodoSuccess({ id: action.id }),
              showAlert({
                message: 'Deleted successfully.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to delete todo',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
