import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListingComponent } from './todo-listing.component';

describe('TodoListingComponent', () => {
  let component: TodoListingComponent;
  let fixture: ComponentFixture<TodoListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListingComponent]
    });
    fixture = TestBed.createComponent(TodoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
