import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PosComponent } from './pos/pos.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CurrencyFormatDirective } from 'src/app/directives/currency-format.directive';

@NgModule({
  declarations: [ListComponent, PosComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    SharedModule,
    MatSlideToggleModule,
    ToastModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    TableModule,
    CurrencyFormatDirective,
    RouterModule.forChild([
      { path: 'pos', component: PosComponent },
      { path: 'orders', component: ListComponent },
    ]),
  ],
  providers: [MessageService, DialogService],
})
export class SaleModule {}
