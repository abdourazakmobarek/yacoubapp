import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule} from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule} from "@angular/material/divider";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  exports:[
    MatInputModule,
    MatSelectModule,
     MatRadioModule,
     MatCardModule ,
     MatCheckboxModule,
     MatPaginatorModule,
     MatTableModule,
     MatSortModule,
     MatDialogModule,
     MatDividerModule,
     MatDatepickerModule,
     MatToolbarModule,
     MatIconModule,
     MatButtonModule,
     MatFormFieldModule,
     MatMenuModule,
     MatAutocompleteModule,
     MatToolbarModule,
     MatDatepickerModule,
     MatNativeDateModule
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
