import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    OrderComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    DialogModule

  ],
  providers:[MessageService],
  exports:[HeaderComponent]
})
export class ShopModule {}
