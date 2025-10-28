import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  getTrialBalance():Observable<any> {
    return this.http.get(ReportUrls.getTrialBalanceReport);
  }

  getIncomeExpenseReport():Observable<any> {
    return this.http.get(ReportUrls.getIncomeExpenseReport);
  }

  getTransactionReport():Observable<any> {
    return this.http.get(ReportUrls.getTransactionReport);
  }
}
