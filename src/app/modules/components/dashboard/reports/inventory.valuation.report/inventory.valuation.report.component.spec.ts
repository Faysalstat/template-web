import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryValuationReportComponent } from './inventory.valuation.report.component';

describe('InventoryValuationReportComponent', () => {
  let component: InventoryValuationReportComponent;
  let fixture: ComponentFixture<InventoryValuationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryValuationReportComponent]
    });
    fixture = TestBed.createComponent(InventoryValuationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
