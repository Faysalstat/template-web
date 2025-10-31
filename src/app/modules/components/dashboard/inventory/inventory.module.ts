import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToastModule } from 'primeng/toast';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [AddStockComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    ToastModule,
    TableModule,
    RouterModule.forChild([
      { path: 'add-stock', component: AddStockComponent },
      { path: 'orders', component: ListComponent },
    ]),
  ],
  providers: [MessageService, DialogService],
})
export class InventoryModule {}
