import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListingComponent } from './component/todo-listing/todo-listing.component';

const routes: Routes = [
  {path: '', component: TodoListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
