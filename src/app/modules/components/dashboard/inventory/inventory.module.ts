import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AddStockComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'add-stock', component: AddStockComponent },
    ]),
  ],
  providers: [MessageService, DialogService],
})
export class InventoryModule {}
