import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoFormComponent } from './todo-form.component';
import { TodoReducer } from 'src/app/store/todo/todo.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoFormComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ todo: TodoReducer }),
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.todoform.valid).toBeFalsy();
  });

  it('form should be valid when filled', () => {
    component.todoform.setValue({
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      dueDate: '2024-08-01',
      isCompleted: false,
      created: '2024-08-01',
      lastUpdated: '2024-08-01'
    });
    expect(component.todoform.valid).toBeTruthy();
  });
});
