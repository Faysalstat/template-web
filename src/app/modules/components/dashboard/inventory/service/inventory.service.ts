import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  // quantity is no longer stored here for a batch
}

export interface StockBatch {
  id?: string; // For existing batches
  productId: string;
  productName?: string; // For display purposes
  buyingPrice: number;
  discount: number;
  shippingCost: number;
  variantQuantities: VariantQuantity[]; // The new core data
}

export interface VariantQuantity {
  variantId: string;
  quantity: number;
}

// ------- DUMMY DATA ------- //
// Dummy data for product variants (the product's possible options)
const MOCK_PRODUCT_VARIANTS: { [productId: string]: ProductVariant[] } = {
  'prod-123': [
    { id: 'var-1', size: 'S', color: 'Black', sku: 'TSHIRT-S-BLK' },
    { id: 'var-2', size: 'M', color: 'Black', sku: 'TSHIRT-M-BLK' },
    { id: 'var-3', size: 'L', color: 'Black', sku: 'TSHIRT-L-BLK' },
    { id: 'var-4', size: 'S', color: 'White', sku: 'TSHIRT-S-WHT' },
    { id: 'var-5', size: 'M', color: 'White', sku: 'TSHIRT-M-WHT' },
    { id: 'var-6', size: 'L', color: 'White', sku: 'TSHIRT-L-WHT' },
  ],
  'prod-456': [
    { id: 'var-7', size: '10', color: 'Navy Blue', sku: 'SHOE-10-NVY' },
    { id: 'var-8', size: '11', color: 'Navy Blue', sku: 'SHOE-11-NVY' },
    { id: 'var-9', size: '12', color: 'Navy Blue', sku: 'SHOE-12-NVY' },
  ],
};

// Dummy data for existing stock batches (previous shipments)
const MOCK_STOCK_BATCHES: StockBatch[] = [
  {
    id: 'batch-1',
    productId: 'prod-123',
    buyingPrice: 15.50,
    discount: 1.00,
    shippingCost: 25.00,
    variantQuantities: [
      { variantId: 'var-1', quantity: 10 }, // S Black
      { variantId: 'var-2', quantity: 20 }, // M Black
      { variantId: 'var-5', quantity: 15 }, // M White
    ]
  }
];
// ------- END DUMMY DATA ------- //

@Injectable({ providedIn: 'root' })
export class InventoryService {

  // Get the possible variants for a product to display in the form
  getProductVariants(productId: string): Observable<ProductVariant[]> {
    const variants = MOCK_PRODUCT_VARIANTS[productId] || [];
    return of(variants).pipe(delay(500));
  }

  // Submit a new stock batch
  addStockBatch(batch: StockBatch): Observable<StockBatch> {
    console.log('Mock API Call: Adding stock batch', batch);
    // Simulate saving and getting a response with an ID
    const newBatch = { ...batch, id: `batch-${Date.now()}` };
    MOCK_STOCK_BATCHES.push(newBatch);
    return of(newBatch).pipe(delay(1000));
  }
}