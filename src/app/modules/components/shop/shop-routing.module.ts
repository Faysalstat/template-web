import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "src/app/app-auth.guard";
import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from "./home/home.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
const ROUTES:Routes = [
    {path: '',canActivate:[AppAuthGuard],component: HomeComponent,
        children: [
          { path: '', component:ProductsComponent},
            { path: 'product/details/:id', component:ProductDetailsComponent},
      ]}
]
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }