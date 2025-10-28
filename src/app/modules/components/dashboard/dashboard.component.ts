import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared-services/order.service';
import { GlSummaryComponent } from './dashboard-comps/gl-summary';
interface Order {
  id: number;
  orderNo: string;
  productCode: string;
  productName: string;
  variant: string;
  quantity: number;
  deliveryType: string;
  address: string;
  total: number;
  shipping: number;
  discount: number;
  paymentType: string;
  status: string;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orderStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'];
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
      this.getAllOrders();
  };
  getAllOrders(){
    this.orderService.getAllSaleOrders().subscribe({
      next:(res:any)=>{
        this.orders = res.body;
      }
    })
  }
  getDiscountedTotal(order: Order): number {
    return order.total + order.shipping - order.discount;
  }

  updateOrderStatus(order: Order, nextStatus: string) {
    const currentIndex = this.orderStatuses.indexOf(order.status);
    const nextIndex = this.orderStatuses.indexOf(nextStatus);

    if (nextStatus === 'CANCELLED' || nextIndex === currentIndex + 1) {
      // optimistic UI update
      const oldStatus = order.status;
      order.status = nextStatus;

      // service call
      this.orderService.updateStatus(order.orderNo, nextStatus).subscribe({
        next: () => {
          console.log(`Order ${order.orderNo} updated to ${nextStatus}`);
          this.getAllOrders();
        },
        error: (err:any) => {
          console.error('Failed to update order status', err);
          // rollback on error
          order.status = oldStatus;
        },
      });
    }
  }
}
