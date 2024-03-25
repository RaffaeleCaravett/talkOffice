import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeRoutingModule } from './office-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { OfficeComponent } from './office.component';


@NgModule({
  declarations: [
    OfficeComponent
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class OfficeModule { }
