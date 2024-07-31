import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/store/model/todo.model';
import { getTodoList } from 'src/app/store/todo/todo.selectors';
import { loadTodo } from 'src/app/store/todo/todo.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.css']
})
export class TodoListingComponent implements OnInit{

  TodoList!: Todo[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns : string[]= ["id", "title", "description", "dueDate", "isCompleted", "action"];

  constructor(private dialog: MatDialog, private store: Store){

  }
  ngOnInit(): void {
    this.store.dispatch(loadTodo());
    this.store.select(getTodoList).subscribe(item => {
      this.TodoList = item;
      this.dataSource = new MatTableDataSource<Todo>(this.TodoList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FunctionAdd(){
    this.OpenPopup(0, 'Create Todo')
  }

  OpenPopup(id:number, title:string){
    this.dialog.open(TodoFormComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        id:id,
        title:title
      }
    })
  }

}
