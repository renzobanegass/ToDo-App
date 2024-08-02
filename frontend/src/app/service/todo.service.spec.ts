import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../store/model/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all todos', () => {
    const dummyTodos: Todo[] = [
      { id: 1, title: 'Test Todo 1', description: 'Description 1', dueDate: new Date(), isCompleted: false, created: new Date(), lastUpdated: null },
      { id: 2, title: 'Test Todo 2', description: 'Description 2', dueDate: new Date(), isCompleted: false, created: new Date(), lastUpdated: null }
    ];

    service.GetAll().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });

    const req = httpMock.expectOne(req => req.url.endsWith('/api/todo'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });

  it('should retrieve a todo by ID', () => {
    const dummyTodo: Todo = { id: 1, title: 'Test Todo 1', description: 'Description 1', dueDate: new Date(), isCompleted: false, created: new Date(), lastUpdated: null };

    service.GetById(1).subscribe(todo => {
      expect(todo).toEqual(dummyTodo);
    });

    const req = httpMock.expectOne(req => req.url.endsWith('/api/todo/1'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodo);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
