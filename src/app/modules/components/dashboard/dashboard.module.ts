import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/material.module';
import { PagesModule } from '../pages/pages.module';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';
import { OrderComponent } from '../shop/order/order.component';
import { GlSummaryComponent } from './dashboard-comps/gl-summary';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        MaterialModule,
        PagesModule,
        GlSummaryComponent
    ],
    declarations: [DashboardComponent,ConfigurationSettingComponent]
})
export class DashboardModule { }
