import { Component } from '@angular/core';
import { OrderService } from '../../shared-services/order.service';
interface Order {
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
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

orderStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

  orders: Order[] = [
    {
      orderNo: 'ORD-1001',
      productCode: 'P001',
      productName: 'T-Shirt',
      variant: 'Blue - XL',
      quantity: 2,
      deliveryType: 'Inside Dhaka',
      address: 'Banani, Dhaka',
      total: 1000,
      shipping: 60,
      discount: 10,
      paymentType: 'COD',
      status: 'PENDING'
    },
    {
      orderNo: 'ORD-1002',
      productCode: 'P002',
      productName: 'Shoes',
      variant: 'Black - 42',
      quantity: 1,
      deliveryType: 'Outside Dhaka',
      address: 'Chittagong',
      total: 2200,
      shipping: 120,
      discount: 0,
      paymentType: 'COD',
      status: 'CONFIRMED'
    }
  ];
constructor(private orderService: OrderService) {}
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
        },
        error: (err) => {
          console.error('Failed to update order status', err);
          // rollback on error
          order.status = oldStatus;
        }
      });
    }
  }
}
