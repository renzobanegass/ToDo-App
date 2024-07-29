import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.css']
})
export class TodoListingComponent implements OnInit{

  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {
    
  }

  FunctionAdd(){
    this.OpenPopup(0, 'Create Todo')
  }

  OpenPopup(code:number, title:string){
    this.dialog.open(TodoFormComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        code:code,
        title:title
      }
    })
  }

}
