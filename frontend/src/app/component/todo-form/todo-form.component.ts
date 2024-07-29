import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dateTimeValidator } from 'src/app/date-time.validator';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title = 'Create Todo';
  dialogdata:any;

  constructor(private builder:FormBuilder, private ref: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.dialogdata=this.data;
    this.title=this.dialogdata.title;
  }

  ClosePopup(){
    this.ref.close();
  }

  todoform = this.builder.group({
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    dueDate: this.builder.control('', [Validators.required, dateTimeValidator]),
    isCompleted: this.builder.control(false),    
  })

  SaveTodo(){
    if(this.todoform.valid){

    }
  }

}
