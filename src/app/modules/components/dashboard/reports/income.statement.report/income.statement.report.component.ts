import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
  selector: 'app-income.statement.report',
  templateUrl: './income.statement.report.component.html',
  styleUrls: ['./income.statement.report.component.scss']
})
export class IncomeStatementReportComponent implements OnInit{
  totalSalesRevenue: number = 0;
  totalShippingIncome: number = 0;
  totalDiscountIncome: number = 0;
  totalOtherIncome: number = 0;
  totalCOGS: number = 0;
  totalShippingExpenses: number = 0;
  totalDiscountsExpenses: number = 0;
  totalOtherExpenses: number = 0;
  totalInvestment:number = 0;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.fetchIncomeStatementData();
  }

  fetchIncomeStatementData() {
    this.reportsService.getIncomeExpenseReport().subscribe({
      next: (data) => {
        const reportData = data.body;
        this.totalSalesRevenue = reportData.totalSalesRevenue || 0;
        this.totalShippingIncome = reportData.totalShippingIncome || 0;
        this.totalDiscountIncome = reportData.totalDiscountIncome || 0;
        this.totalOtherIncome = reportData.totalOtherIncome || 0;
        this.totalCOGS = reportData.totalCOGS || 0;
        this.totalShippingExpenses = reportData.totalShippingExpenses || 0;
        this.totalDiscountsExpenses = reportData.totalDiscountsExpenses || 0;
        this.totalOtherExpenses = reportData.totalOtherExpenses || 0;
        this.totalInvestment = reportData.totalInvestment || 0;
      },
      error: (error) => {
        console.error('Error fetching income statement data:', error);
      }
    });
  }
}
