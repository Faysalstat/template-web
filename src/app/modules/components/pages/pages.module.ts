import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AddBrandNameComponent } from './add-brand-name/add-brand-name.component';
import { AddTnxReasonComponent } from './add-tnx-reason/add-tnx-reason.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const comps:any[] = [AddBrandNameComponent,AddTnxReasonComponent,UnitTypeComponent,ProductCategoryComponent]
@NgModule({
    declarations: comps,
    imports: [
        CommonModule,
        PagesRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:comps
})
export class PagesModule { }
