import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../store/model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'https://localhost:7282/api/todo'
  constructor(private http:HttpClient) { 

   }

   GetAll() {      
      return this.http.get<Todo[]>(this.baseUrl);
   }

   GetById(id: number) {
      console.log(id);
      return this.http.get<Todo>(this.baseUrl +'/'+ id);
   }

   Create(data: Todo) {
      return this.http.post(this.baseUrl, data);
   }

   Update(data: Todo) {
    return this.http.put(this.baseUrl+'/'+ data.id, data)
   }

   Delete(id: number) {
      return this.http.delete(this.baseUrl +'/'+ id);
   }
}
