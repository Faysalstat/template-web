import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/modules/shared-services/stock.service';

@Component({
  selector: 'supply-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: InventoryService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this.orderService.getAllSupplyOrders().subscribe({
      next: (res:any) => {
        this.orders = res.body;
      },
    });
  }
}