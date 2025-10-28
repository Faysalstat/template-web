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



@NgModule({
  declarations: [
    TableDataComponent,
    BalanceReportComponent,
    IncomeStatementReportComponent,
    BalancesheetReportComponent,
    TransactionReportComponent,
    TrialBalanceComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'trial-balance', component: TrialBalanceComponent },
      { path: 'income-statement', component: IncomeStatementReportComponent },
    ]),
  ],
})
export class ReportsModule {}
