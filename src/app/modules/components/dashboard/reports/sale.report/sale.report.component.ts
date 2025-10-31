import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
  selector: 'app-sale.report',
  templateUrl: './sale.report.component.html',
  styleUrls: ['./sale.report.component.scss'],
})
export class SaleReportComponent implements OnInit {
  reportData: any[] = [];

  constructor(private reportService: ReportsService) {}

  ngOnInit(): void {
    this.fetchReportData();
  }

  fetchReportData() {
    this.reportService.getSaleReport().subscribe({
      next: (data) => {
        this.reportData = data.body || [];
      },
      error: (error) => {
        console.error('Error fetching sale report data:', error);
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
