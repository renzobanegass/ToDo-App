import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { TodoListingComponent } from './todo-listing.component';
import { TodoReducer } from 'src/app/store/todo/todo.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

describe('TodoListingComponent', () => {
  let component: TodoListingComponent;
  let fixture: ComponentFixture<TodoListingComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let store: Store;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ TodoListingComponent ],
      imports: [
        StoreModule.forRoot({ todo: TodoReducer }),
        BrowserAnimationsModule, // Add this
        MaterialModule // Add this
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListingComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    const loadTodoSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(loadTodoSpy).toHaveBeenCalled();
  });

  it('should open the dialog when FunctionAdd is called', () => {
    component.FunctionAdd();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should open the dialog when FunctionEdit is called', () => {
    component.FunctionEdit(1);
    expect(dialogSpy.open).toHaveBeenCalled();
  });
});
