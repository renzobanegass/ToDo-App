import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/service/todo.service';
import {
  addTodo,
  addTodoSuccess,
  loadTodo,
  loadTodoFail,
  loadTodoSuccess,
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
}
