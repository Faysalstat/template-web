import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
  selector: 'app-stock.report',
  templateUrl: './stock.report.component.html',
  styleUrls: ['./stock.report.component.scss']
})
export class StockReportComponent implements OnInit {
  reportData: any[] = [];

  constructor(private reportService: ReportsService) {}

  ngOnInit(): void {
    this.fetchReportData();
  }

  fetchReportData() {
    this.reportService.getStockReport().subscribe({
      next: (data) => {
        this.reportData = data.body || [];
      },
      error: (error) => {
        console.error('Error fetching stock report data:', error);
      },
    });
  }
  formatDateLocalized(dateString: string, locale: string = 'en-GB'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}
}
