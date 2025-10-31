import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../service/reports.service';

@Component({
  selector: 'app-inventory.valuation.report',
  templateUrl: './inventory.valuation.report.component.html',
  styleUrls: ['./inventory.valuation.report.component.scss'],
})
export class InventoryValuationReportComponent implements OnInit {
  reportData: any[] = [];
  offset: number = 0;
  totalInventoryValue: number = 0;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.fetchInventoryValuationData();
  }

  fetchInventoryValuationData() {
    this.reportsService.getProductReport().subscribe({
      next: (data) => {
        this.reportData = data.body || [];
      },
      error: (error) => {
        console.error('Error fetching inventory valuation data:', error);
      },
    });
  }
}
