import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/modules/shared-services/product.service';
import { NotificationService } from 'src/app/modules/shared-services/notification-service.service';
import { BASE_URL, DELIVERY_INSIDE_DHAKA, DELIVERY_OUTSIDE_DHAKA } from 'src/app/utils/urls.const';
import { OrderService } from 'src/app/modules/shared-services/order.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  saleOrderForm!: FormGroup;
  deliveryLocation = 'inside';
  product: any;
  BASE_URL = BASE_URL;
  showSuccess:boolean = false;
  orderId:string = 'ORD-1287391872398'
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService
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
    this.saleOrderForm = this.formBuilder.group({
      // =======================
      customerName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      deliveryArea: ['Inside', [Validators.required]],
      selectedProduct: [null],
      selectedVariant: [null],
      quantity: [1, [Validators.min(1)]],
      pricePerUnit: [0, [Validators.min(1)]],
      totalPrice: [0, [Validators.min(1)]],
      discount: [0],
      shippingCost: [DELIVERY_INSIDE_DHAKA],
      otherCost: [0],
      otherCostReason: [''],
      totalPayable: [0, [Validators.min(1)]],
      paymentMethod: ['COD'],
    });
    this.saleOrderForm.get('quantity')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    this.saleOrderForm
      .get('deliveryArea')
      ?.valueChanges.subscribe((data: any) => {
        if (data == 'Inside') {
          this.saleOrderForm.get('shippingCost')?.setValue(DELIVERY_INSIDE_DHAKA);
        } else {
          this.saleOrderForm.get('shippingCost')?.setValue(DELIVERY_OUTSIDE_DHAKA);
        }
      });
    this.saleOrderForm.get('discount')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    this.saleOrderForm
      .get('shippingCost')
      ?.valueChanges.subscribe((data: any) => {
        this.calculateTotal();
      });
  }

  fetchProductById(id: any) {
    this.productService.fetchProductById(id).subscribe({
      next: (res:any) => {
        if (res.body) {
          this.product = res.body;
          this.saleOrderForm.patchValue({
            productId: this.product.id,
            pricePerUnit: this.product.sellingPricePerUnit,
            selectedVariant:this.product.variants[0]
          });
           this.calculateTotal();
        }
      },
      error: (err:any) => {
        this.notificationService.showMessage(
          'ERROR',
          'Error Occured',
          'OK',
          300
        );
      },
    });
  }
  onSubmit() {
    
    if (this.saleOrderForm.valid) {
      const formValue = { ...this.saleOrderForm.getRawValue() };
      const payload = {
        customerName: formValue.customerName,
        phone: formValue.phone,
        email: formValue.email,
        address: formValue.address,
        productId: this.product.id,
        variantId: formValue.selectedVariant.id,
        quantity: formValue.quantity,
        pricePerUnit: formValue.pricePerUnit,
        totalPrice: formValue.totalPrice,
        discount: formValue.discount,
        shippingCost: formValue.shippingCost,
        otherCost: formValue.otherCost,
        otherCostReason: formValue.otherCostReason,
        totalPayable: formValue.totalPayable,
        paymentMethod: formValue.paymentMethod,
      };
      console.log(payload);
      this.orderService.placeOrder(payload).subscribe({
        next: (res:any) => {
          if(res) {
            this.showSuccess = true;
            this.saleOrderForm.reset();
          }
        },
        error: (err:any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Form',
      });
      return;
    }
  }
  decrementQuantity() {
    if (this.saleOrderForm.get('quantity')?.value > 1) {
      this.saleOrderForm
        .get('quantity')
        ?.setValue(this.saleOrderForm.get('quantity')?.value - 1);
    }
  }
  incrementQuantity() {
    this.saleOrderForm
      .get('quantity')
      ?.setValue(this.saleOrderForm.get('quantity')?.value + 1);
  }

  calculateTotal() {
    const pricePerUnit = this.saleOrderForm.get('pricePerUnit')?.value || 0;
    const quantity = this.saleOrderForm.get('quantity')?.value || 0;
    const totalPrice = pricePerUnit * quantity;
    const discount = this.saleOrderForm.get('discount')?.value || 0;
    const shippingCost = this.saleOrderForm.get('shippingCost')?.value || 0;
    const otherCost = this.saleOrderForm.get('otherCost')?.value || 0;
    const totalPayable = totalPrice - discount + shippingCost + otherCost || 0;
    console.log(totalPayable);
    this.saleOrderForm.get('totalPrice')?.setValue(totalPrice);
    this.saleOrderForm.get('totalPayable')?.setValue(totalPayable);
  }
  goBack(){
    this.showSuccess = false;
    this.router.navigate(['']);
  }
}
