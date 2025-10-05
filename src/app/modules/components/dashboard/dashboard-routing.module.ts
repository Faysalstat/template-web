import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
        { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)},
        { path:'config',component: ConfigurationSettingComponent}
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
