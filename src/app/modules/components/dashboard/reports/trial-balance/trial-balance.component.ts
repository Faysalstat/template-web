import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent implements OnInit {
  accounts: any[] = [];
  offset: number = 0;
  length: number = 100;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalDebit: number = 0;
  totalCredit: number = 0;
  constructor(private reportService: ReportsService) { }

  ngOnInit(): void {
    this.loadTrialBalance();
  }

  loadTrialBalance() {
    this.reportService.getTrialBalance().subscribe({
      next: (data) => {
        this.accounts = data.body;
        this.accounts.forEach(account => {
          this.totalDebit += account.debitAmount;
          this.totalCredit += account.creditAmount;
        });
      },
      error: (error) => {
        console.error('Error fetching trial balance data:', error);
      }
    })
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.loadTrialBalance();
  }
}
