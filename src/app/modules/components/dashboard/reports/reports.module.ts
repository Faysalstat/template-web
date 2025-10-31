import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from './table-data/table-data.component';
import { BalanceReportComponent } from './balance.report/balance.report.component';
import { IncomeStatementReportComponent } from './income.statement.report/income.statement.report.component';
import { BalancesheetReportComponent } from './balancesheet.report/balancesheet.report.component';
import { TransactionReportComponent } from './transaction.report/transaction.report.component';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { InventoryValuationReportComponent } from './inventory.valuation.report/inventory.valuation.report.component';
import { SaleReportComponent } from './sale.report/sale.report.component';
import { StockReportComponent } from './stock.report/stock.report.component';
import { CurrencyFormatDirective } from 'src/app/directives/currency-format.directive';



@NgModule({
  declarations: [
    TableDataComponent,
    BalanceReportComponent,
    IncomeStatementReportComponent,
    BalancesheetReportComponent,
    TransactionReportComponent,
    TrialBalanceComponent,
    InventoryValuationReportComponent,
    SaleReportComponent,
    StockReportComponent,
    
  ],
  imports: [
    CommonModule,
    TableModule,
    MaterialModule,
    CurrencyFormatDirective,
    RouterModule.forChild([
      { path: 'trial-balance', component: TrialBalanceComponent },
      { path: 'income-statement', component: IncomeStatementReportComponent },
      { path: 'sale-report', component: SaleReportComponent },
      { path: 'stock-report', component: StockReportComponent },
      { path: 'product-inventory-valuation', component: InventoryValuationReportComponent },
    ]),
  ],
  
})
export class ReportsModule {}
