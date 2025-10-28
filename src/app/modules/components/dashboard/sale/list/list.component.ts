import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/modules/shared-services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this.orderService.getAllSaleOrders().subscribe({
      next: (res:any) => {
        this.orders = res.body;
      },
    });
  }
}
