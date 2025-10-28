import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleReportComponent } from './sale-report/sale-report.component';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [
    SaleReportComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ReportsModule { }
