import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatRadioModule } from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    exports:[
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule,
        MatRadioModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatIconModule
    ]
})
export class MaterialModule{}