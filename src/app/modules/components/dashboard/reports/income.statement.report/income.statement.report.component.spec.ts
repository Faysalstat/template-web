import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatementReportComponent } from './income.statement.report.component';

describe('IncomeStatementReportComponent', () => {
  let component: IncomeStatementReportComponent;
  let fixture: ComponentFixture<IncomeStatementReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeStatementReportComponent]
    });
    fixture = TestBed.createComponent(IncomeStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
