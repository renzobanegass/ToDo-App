import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { dateTimeValidator } from 'src/app/date-time.validator';
import { Todo } from 'src/app/store/model/todo.model';
import { addTodo } from 'src/app/store/todo/todo.action';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title = 'Create Todo';
  dialogdata:any;

  constructor(private builder:FormBuilder, private ref: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }
  ngOnInit(): void {
    this.dialogdata=this.data;
    this.title=this.dialogdata.title;
  }

  ClosePopup(){
    this.ref.close();
  }

  todoform = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    dueDate: this.builder.control('', Validators.required),
    isCompleted: this.builder.control(false),  
    created: this.builder.control(''),
    lastUpdated: this.builder.control('')
  })

  SaveTodo(){
    if(this.todoform.valid){
      const formValues = this.todoform.value;

      const _obj:Todo={
        id: formValues.id as number,
        title: formValues.title as string,
        description: formValues.description as string,
        dueDate: new Date(formValues.dueDate as string), 
        isCompleted: formValues.isCompleted as boolean,
        created: formValues.created ? new Date(formValues.created as string) : new Date(),
        lastUpdated: formValues.lastUpdated ? new Date(formValues.lastUpdated as string) : null
      }
      this.store.dispatch(addTodo({inputData: _obj}))
      this.ClosePopup();
    }
  }

}
