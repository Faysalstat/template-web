import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared-services/notification-service.service';
import { ProductService } from 'src/app/modules/shared-services/product.service';
import { BASE_URL } from 'src/app/utils/urls.const';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  productAddingForm!: FormGroup;
  categories!: any[];
  packagingCategories!: any[];
  brandNames!: any[];
  units!: any[];
  showLoader: boolean = false;
  isEdit: boolean = false;
  product!: any;
  errMsg: string = '';
  productImageUrl: string = BASE_URL + '/uploads/default-featured-image.png';
  selectedFile: File | null = null;
  isUploading = false;
  variantName = '';
  checked = true;
  costPricePerUnit = 0;
  sellingPricePerUnit = 0;
  variants: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // this.product = this.dummyProduct;
    this.prepareForm();
    this.fetchProductCategory();
    this.fetchUnitType();
    this.fetchBrandName();
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['id']) {
        let id = parameter['id'];
        this.isEdit = true;
        this.fetchProductById(id);
      } else {
        this.isEdit = false;
        console.log('create');
      }
    });


    // testing
    // this.setFormValue();
  }
  fetchProductById(id: any) {
    this.productService.fetchProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.body) {
          this.product = res.body;
          this.setFormValue();
          this.productAddingForm.get('productCode')?.disable();
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
  prepareForm() {
    this.productAddingForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      unitType: ['', [Validators.required]],
      quantity: [0],
      brandName: ['', [Validators.required]],
      costPricePerUnit: [0],
      sellingPricePerUnit: [0],
      unitPerPackage: [0],
      imageUrl: [''],
    });
  }

  fetchPackagingCategory() {
    this.packagingCategories = [{ label: 'Select category', value: '' }];
    this.productService.fetchAllPackagingCategory().subscribe({
      next: (res) => {
        let categories = res.body;
        if (res.body) {
          categories.map((elem: any) => {
            let category = { label: elem.key, value: elem.value };
            this.packagingCategories.push(category);
          });
        }
      },
      error: (err) => {
        this.notificationService.showMessage(
          'FAILED!',
          'Packaging Category Fetching Failed',
          'OK',
          1000
        );
      },
    });
  }
  addProduct() {
    if (this.productAddingForm.invalid) {
      this.notificationService.showErrorMessage(
        'INVALID FORM',
        'Please Input Required Fields',
        'OK',
        600
      );
      return;
    }
    this.showLoader = true;
    let productModel = this.productAddingForm.value;
    productModel.variants = this.variants;
    productModel.isEdit = this.isEdit;
    const params: Map<string, any> = new Map();
    params.set('product', productModel);
    console.log(productModel);
    this.productService.addProduct(params).subscribe({
      next: (res) => {
        if (res.isUpdated) {
          this.productAddingForm.reset();
          this.productImageUrl =
            BASE_URL + '/uploads/default-featured-image.png';
          this.notificationService.showMessage(
            'SUCCESS!',
            'Product Added Successfuly',
            'OK',
            1000
          );
        } else {
          this.productAddingForm.reset();
          this.productImageUrl =
            BASE_URL + '/uploads/default-featured-image.png';
          this.notificationService.showMessage(
            'SUCCESS!',
            'Product Updated Successfuly',
            'OK',
            1000
          );
          this.prepareForm();
          this.variants = [];
        }
        // this.route.navigate(["/admin/product-list"]);
      },
      error: (err) => {
        this.notificationService.showMessage(
          'FAILED!',
          'Product Add Failed',
          'OK',
          1000
        );
      },
      complete: () => {
        this.showLoader = false;
      },
    });
  }
  setFormValue() {
    this.productAddingForm = this.formBuilder.group({
      id: this.product.id,
      productCode: this.product.productCode || '',
      productName: this.product.productName || '',
      productCategory: this.product.productCategory || '',
      unitType: this.product.unitType || '',
      brandName: this.product.brandName || '',
      unitPerPackage: this.product.unitPerPackage || '',
      costPricePerUnit: this.product.costPricePerUnit || 0,
      sellingPricePerUnit: this.product.sellingPricePerUnit || 0,
      imageUrl: this.product.imageUrl,
    });
    if (this.product.imageUrl) {
      this.productImageUrl = BASE_URL + this.product.imageUrl;
    }
    if (this.product.variants) {
      this.variants = this.product.variants;
    }
  }

  fetchProductCategory() {
    this.categories = [{ label: 'Select Category', value: '' }];
    this.productService.fetchAllProductCategory().subscribe({
      next: (res) => {
        if (res.body) {
          let categoryList = res.body;
          categoryList.map((elem: any) => {
            let option = { label: elem.key, value: elem.value };
            this.categories.push(option);
          });
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            'No Product Category Found',
            'OK',
            500
          );
        }
      },
    });
  }

  fetchUnitType() {
    this.units = [{ label: 'Select Unit Type', value: '' }];
    this.productService.fetchAllUnitType().subscribe({
      next: (res) => {
        if (res.body) {
          let unitList = res.body;
          unitList.map((elem: any) => {
            let option = { label: elem.key, value: elem.value };
            this.units.push(option);
          });
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            'No Unit Type Found',
            'OK',
            500
          );
        }
      },
    });
  }
  checkDuplicateProduct() {
    const params: Map<string, any> = new Map();
    params.set('code', this.productAddingForm.get('productCode')?.value);
    params.set('name', '');
    if (!this.isEdit) {
      this.productService.fetchProductByCode(params).subscribe({
        next: (res) => {
          if (res.isExist) {
            this.productAddingForm.get('productName')?.disable();
            this.productAddingForm.get('productCategory')?.disable();
            this.productAddingForm.get('unitType')?.disable();
            // this.productAddingForm.get('quantity')?.disable();
            this.productAddingForm.get('brandName')?.disable();
            // this.productAddingForm.get('costPricePerUnit')?.disable();
            // this.productAddingForm.get('sellingPricePerUnit')?.disable();
            // this.productAddingForm.get('packagingCategory')?.disable();
            this.productAddingForm.get('unitPerPackage')?.disable();
            this.errMsg = '**This Product Already Exits';
          } else {
            this.productAddingForm.get('productName')?.enable();
            this.productAddingForm.get('productCategory')?.enable();
            // this.productAddingForm.get('unitType')?.enable();
            this.productAddingForm.get('quantity')?.enable();
            this.productAddingForm.get('brandName')?.enable();
            // this.productAddingForm.get('costPricePerUnit')?.enable();
            // this.productAddingForm.get('sellingPricePerUnit')?.enable();
            // this.productAddingForm.get('packagingCategory')?.enable();
            this.productAddingForm.get('unitPerPackage')?.enable();
            this.errMsg = '';
          }
        },
      });
    }
  }
  fetchBrandName() {
    this.brandNames = [{ label: 'Select Brand Name', value: '' }];
    this.productService.fetchAllBrandName().subscribe({
      next: (res) => {
        if (res.body) {
          let brandNames = res.body;
          brandNames.map((elem: any) => {
            let option = { label: elem.key, value: elem.value };
            this.brandNames.push(option);
          });
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            'No Brand Name Found',
            'OK',
            500
          );
        }
      },
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.productService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        if (!res) return;
        this.productImageUrl = `${BASE_URL + res.filePath}`; // 👈 backend response path
        this.isUploading = false;
        this.productAddingForm.patchValue({ imageUrl: res.filePath });
        this.notificationService.showMessage(
          'SUCCESS',
          'Image Uploaded Successfully',
          'OK',
          300
        );
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.isUploading = false;
      },
    });
  }

  addVariant() {
    if (this.variantName) {
      this.variants.push({ name: this.variantName, costPricePerUnit: this.costPricePerUnit, sellingPricePerUnit: this.sellingPricePerUnit });
      this.variantName = '';
    }
  }
}
