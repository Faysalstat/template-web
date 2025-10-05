import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/modules/shared-services/product.service';
import { NotificationService } from 'src/app/modules/shared-services/notification-service.service';
import { BASE_URL } from 'src/app/utils/urls.const';
import { OrderService } from 'src/app/modules/shared-services/order.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  orderForm!: FormGroup;
  deliveryLocation = "inside"
  product: any;
  BASE_URL = BASE_URL;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.prepareForm();
  }
  ngOnInit(): void {
    
    // Initialize the form and other properties here
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['id']) {
        let id = parameter['id'];
        
        this.fetchProductById(id);
      }
    });
  }
  prepareForm() {
    this.orderForm = this.formBuilder.group({
      productId: ['', [Validators.required]],
      orderQuantity: [1, [Validators.required, Validators.min(1)]],
      customerName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      deliveryLocation: ['', [Validators.required]],
      deliveryArea: [1, [Validators.required]],
      phone: ['', [Validators.required]],
      pricePerUnit: [0],
      shippingCharge: [0],
      subTotal: [0]
    });
  }

  fetchProductById(id: any) {
    this.productService.fetchProductById(id).subscribe({
      next: (res) => {
        if (res.body) {
          this.product = res.body;
          this.orderForm.patchValue({
            productId: this.product.id
          });
        }
      },
      error: (err) => {
        this.notificationService.showMessage(
          'ERROR',
          'Error Occured',
          'OK',
          300
        );
      },
    });
  }
  onSubmit(){
    console.log(this.orderForm.value);
    let payload = { ...this.orderForm.value };
    payload.pricePerUnit = this.product.sellingPricePerUnit;
    payload.subTotal = this.product.sellingPricePerUnit * this.orderForm.get('orderQuantity')?.value;
    this.orderService.placeOrder(payload).subscribe({
      next: (res) => {
        if (res) {
          this.notificationService.showMessage(
            'SUCCESS',
            'Order Placed Successfuly',
            'OK',
            1000
          );
          this.router.navigate(['/']);
          // this.product = res.body;
          // this.orderForm.patchValue({
          //   productId: this.product.id
          // });
        }
      },
      error: (err) => {
        this.notificationService.showMessage(
          'ERROR',
          'Error Occured',
          'OK',
          300
        );
      },
    });
  }
  decrementQuantity() {
    if (this.orderForm.get('orderQuantity')?.value > 1) {
      this.orderForm.get('orderQuantity')?.setValue(this.orderForm.get('orderQuantity')?.value - 1);
    }
  }
  incrementQuantity() {
    this.orderForm.get('orderQuantity')?.setValue(this.orderForm.get('orderQuantity')?.value + 1);
  }
}
