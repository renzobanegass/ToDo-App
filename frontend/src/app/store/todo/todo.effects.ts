import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "src/app/service/todo.service";
import { loadTodo, loadTodoFail, loadTodoSuccess } from "./todo.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class TodoEffects{
    
    constructor(private action$: Actions, private service: TodoService){

    }

    _loadTodo = createEffect(() => 
        this.action$.pipe(
            ofType(loadTodo),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadTodoSuccess({list: data})
                    }),
                    catchError((_error) => of(loadTodoFail({errorMessage: _error.message})))
                )
            })
        )
    )

}