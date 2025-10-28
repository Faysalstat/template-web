import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { OrderService } from 'src/app/modules/shared-services/order.service';
import { ProductService } from 'src/app/modules/shared-services/product.service';
interface Product {
  id: number;
  productCode: string;
  productName: string;
  sellingPricePerUnit: number;
  variants: Variant[];
}
interface Variant {
  id: number;
  name: string;
  price: number;
  currentStock: number;
}
interface ProductOption {
  product: Product;
  display: string;
}
@Component({
  selector: 'app-pos',
  standalone: false,
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
})
export class PosComponent implements OnInit {
  filteredProducts!: Observable<ProductOption[]>;
  products: Product[] = [];
  saleOrderForm: FormGroup;
  variants: any[] = [];
  methods = [
    { label: 'Cash On Delivery', value: 'COD' },
    { label: 'Bkash', value: 'Bkash' },
    { label: 'Bank', value: 'Bank' },
  ];
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private orderService: OrderService
  ) {
    this.saleOrderForm = this.createForm();
  }
  ngOnInit(): void {
    this.fetchAllProducts();
    this.setupProductFilter();
  }
  private createForm(): FormGroup {
    const saleOrderForm = this.fb.group({
      customerName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      selectedProduct: [null, Validators.required],
      selectedVariant: [null, Validators.required],
      quantity: [1, [Validators.min(1)]],
      pricePerUnit: [0, [Validators.min(1)]],
      totalPrice: [0, [Validators.min(1)]],
      discount: [0],
      shippingCost: [0],
      otherCost: [0],
      otherCostReason: [''],
      totalPayable: [0, [Validators.min(1)]],
      paymentMethod: ['COD'],
    });
    saleOrderForm.get('quantity')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    saleOrderForm.get('pricePerUnit')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    saleOrderForm.get('discount')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    saleOrderForm.get('shippingCost')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    saleOrderForm.get('otherCost')?.valueChanges.subscribe((data: any) => {
      this.calculateTotal();
    });
    return saleOrderForm;
  }
  fetchAllProducts() {
    const params: Map<string, any> = new Map();
    params.set('offset', 0);
    params.set('limit', 0);
    params.set('brandName', '');
    params.set('categoryName', '');
    params.set('code', '');
    this.productService.fetchAllProduct(params).subscribe({
      next: (res:any) => {
        if(res) {
          this.products = res.body;
        }
      },
    });
  }
  private setupProductFilter(): void {
    this.filteredProducts = this.saleOrderForm
      .get('selectedProduct')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProducts(value))
      );
  }

  private _filterProducts(value: string | Product): ProductOption[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    return this.products
      .filter(
        (product) =>
          product.productCode.toLowerCase().includes(filterValue) ||
          product.productName.toLowerCase().includes(filterValue)
      )
      .map((product) => ({
        product,
        display: `${product.productCode} - ${product.productName}`,
      }));
  }

  displayProduct(product: Product): string {
    return product ? `${product.productCode} - ${product.productName}` : '';
  }

  onProductSelected(product: Product): void {
    // Add form controls for each variant
    console.log(product);
    this.saleOrderForm
      .get('pricePerUnit')
      ?.setValue(product.sellingPricePerUnit);
    product.variants.forEach((variant) => {
      const model = {
        variantId: variant.id,
        name: variant.name,
      };
      console.log(model);
      this.variants.push(model);
    });
  }

  onSelectionDeliveryLocation(event: MatRadioChange) {
    console.log('Selected value:', event.value);
    if (event.value == 'Inside') {
      this.saleOrderForm.get('shippingCost')?.setValue(80);
    } else {
      this.saleOrderForm.get('shippingCost')?.setValue(120);
    }
  }
  calculateTotal() {
    const pricePerUnit = this.saleOrderForm.get('pricePerUnit')?.value || 0;
    const quantity = this.saleOrderForm.get('quantity')?.value || 0;
    const totalPrice = pricePerUnit * quantity;
    const discount = this.saleOrderForm.get('discount')?.value || 0;
    const shippingCost = this.saleOrderForm.get('shippingCost')?.value || 0;
    const otherCost = this.saleOrderForm.get('otherCost')?.value || 0;
    const totalPayable = totalPrice - discount + shippingCost + otherCost || 0;
    this.saleOrderForm.get('totalPrice')?.setValue(totalPrice);
    this.saleOrderForm.get('totalPayable')?.setValue(totalPayable);
  }

  onSubmit() {
    if (this.saleOrderForm.valid) {
      const formValue = { ...this.saleOrderForm.getRawValue() };
      const payload = {
        customerName: formValue.customerName,
        phone: formValue.phone,
        email: formValue.email,
        address: formValue.address,
        productId: formValue.selectedProduct.id,
        variantId: formValue.selectedVariant.variantId,
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
          if(res && res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order placed Successfully',
            });
            this.saleOrderForm.reset();
          }else{
            this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
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
}
