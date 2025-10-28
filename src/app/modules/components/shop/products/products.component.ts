import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/shared-services/product.service';
import { BASE_URL } from 'src/app/utils/urls.const';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: any[] = [];
  offset: number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  categories: any[] = [];
  brandName: string = '';
  categoryName: string = '';
  code: string = '';
  showLoader = false;
  valRadio: string = '';

  valCheck: string[] = [];
  readonly baseUrl = BASE_URL;
  constructor(private router: Router, private productService: ProductService) {}
  ngOnInit() {
    this.fetchAllProducts();
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
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'unknown';
    }
  }
  showProductDetails(product: any) {
    this.router.navigate(['product/details', product.id]);
  }
}
