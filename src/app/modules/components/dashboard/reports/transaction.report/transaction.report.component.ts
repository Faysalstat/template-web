import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/modules/shared-services/report.service';

@Component({
  selector: 'app-transaction.report',
  templateUrl: './transaction.report.component.html',
  styleUrls: ['./transaction.report.component.scss']
})
export class TransactionReportComponent implements OnInit{
  transactions: any[] = [];

  constructor( private reportService:ReportService) {}

  ngOnInit(): void {
    // Fetch transaction data from a service or API
    this.loadTransactions();
  }

  loadTransactions() {
    // Placeholder for actual data fetching logic
    this.reportService.getTransactionReport().subscribe({
      next: (data:any[]) => {
        this.transactions = data;
      },
      error: (error) => {
        console.error('Error fetching transaction report:', error);
      }
    });
}
}
