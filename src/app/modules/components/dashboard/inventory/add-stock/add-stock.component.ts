import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from 'src/app/modules/shared-services/notification-service.service';
import { ProductService } from 'src/app/modules/shared-services/product.service';
import { InventoryService } from 'src/app/modules/shared-services/stock.service';

interface Product {
  id: number;
  productCode: string;
  productName: string;
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
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
  stockForm: FormGroup;
  filteredProducts!: Observable<ProductOption[]>;
  offset: number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  brandName: string = '';
  categoryName: string = '';
  code: string = '';
  showLoader = false;
  isPaid: boolean = true;
  // Mock data - replace with your actual data source
  products: Product[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private inventoryService: InventoryService,
    private route: Router
  ) {
    this.stockForm = this.createForm();
  }

  ngOnInit() {
    this.fetchAllProducts();
    this.setupProductFilter();
  }

  private createForm(): FormGroup {
    const stockUpdateForm = this.fb.group({
      supplier: ['', Validators.required],
      selectedProduct: [null],
      variants: this.fb.array([]),
      totalQuantity: [{ value: 0, disabled: true }],
      costPricePerUnit: [0, [Validators.min(0)]],
      totalPrice: [{ value: 0, disabled: true }],
      discount: [0],
      shippingCost: [0],
      otherCost: [0],
      otherCostReason: [''],
      totalCost: [{ value: 0, disabled: true }],
      isPaid: [true],
    });
    stockUpdateForm
      .get('costPricePerUnit')!
      .valueChanges.subscribe(() => this.calculateTotals());
    return stockUpdateForm;
  }

  get variants(): FormArray {
    return this.stockForm.get('variants') as FormArray;
  }

  private setupProductFilter(): void {
    this.filteredProducts = this.stockForm
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
    // Clear existing variants
    while (this.variants.length !== 0) {
      this.variants.removeAt(0);
    }

    // Add form controls for each variant
    product.variants.forEach((variant) => {
      const variantGroup = this.fb.group({
        variantId: [variant.id],
        variantName: [variant.name],
        quantity: [0, [Validators.min(0)]],
        subtotal: [{ value: 0, disabled: true }],
      });

      // Subscribe to quantity and price changes
      variantGroup
        .get('quantity')!
        .valueChanges.subscribe(() => this.calculateTotals());

      this.variants.push(variantGroup);
    });
  }

  calculateTotals(): void {
    let totalQuantity = 0;
    let totalPrice = 0;
    // Calculate subtotals for each variant and overall totals
    this.variants.controls.forEach((variantGroup) => {
      const quantity = variantGroup.get('quantity')!.value || 0;
      const price = this.stockForm.get('costPricePerUnit')!.value || 0;
      const subtotal = quantity * price;

      variantGroup.get('subtotal')!.setValue(subtotal, { emitEvent: false });

      totalQuantity += quantity;
      totalPrice += subtotal;
    });

    // Update form values
    this.stockForm.get('totalQuantity')!.setValue(totalQuantity);
    this.stockForm.get('totalPrice')!.setValue(totalPrice);
    this.calculateTotalCost();
  }

  calculateTotalCost(): void {
    const totalPrice = this.stockForm.get('totalPrice')!.value || 0;
    const discount = this.stockForm.get('discount')!.value || 0;
    const shippingCost = this.stockForm.get('shippingCost')!.value || 0;
    const otherCost = this.stockForm.get('otherCost')!.value || 0;
    const totalCost = totalPrice - discount + shippingCost + otherCost;
    this.stockForm.get('totalCost')!.setValue(totalCost);
  }
  fetchAllProducts() {
    const params: Map<string, any> = new Map();
    this.offset = this.offset;
    params.set('offset', this.offset);
    params.set('limit', this.pageSize);
    params.set('brandName', this.brandName);
    params.set('categoryName', this.categoryName);
    params.set('code', this.code);
    this.productService.fetchAllProduct(params).subscribe({
      next: (res:any) => {
        if(res) {
          console.log(res.body);
          this.products = res.body;
        }
      },
    });
  }
  onSubmit(): void {
    if (this.stockForm.valid) {
      const formValue = { ...this.stockForm.getRawValue() };
      const payload = {
        productId: formValue.selectedProduct.id,
        supplier: formValue.supplier,
        variants: this.variants.getRawValue(),
        totalQuantity: formValue.totalQuantity || 0,
        costPricePerUnit: formValue.costPricePerUnit || 0,
        totalPrice: formValue.totalPrice || 0,
        discount: formValue.discount || 0,
        shippingCost: formValue.shippingCost || 0,
        otherCost: formValue.otherCost || 0,
        otherCostReason: formValue.otherCostReason || 0,
        totalCost: formValue.totalCost || 0,
        isPaid: formValue.isPaid,
      };
      console.log('Form submitted:', payload);
      // Handle form submission here
      this.inventoryService.addStock(payload).subscribe({
        next: (res:any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock Added Successfully',
          });
          this.stockForm.reset();
        },
        error: (err:any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Operation Failed: ' + err.message,
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
