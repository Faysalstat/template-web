import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http: HttpClient) {}

  public fetchAllTransactionReason(): Observable<any> {
    return this.http.get(TransactionUrls.FETCH_TRANSACTION_REASONS);
  }

  public addTransactionReason(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.ADD_TNX_REASON, queryParams.get('model'));
  }
  public deleteTransactionReason(id:any): Observable<any> {
    return this.http.post(TransactionUrls.DELETE_TNX_REASON,{id:id});
  }
  public doExpense(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.DO_EXPENSE_TRANSACTION, queryParams.get('expenseModel'));
  }
  public doDeposit(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.DO_DEPOSIT_TRANSACTION, queryParams.get('depositModel'));
  }
  public paySalary(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.DO_SALARY_TRANSACTION, queryParams.get('salaryModel'));
  }

  public payInstallment(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.DO_LOAN_INSTALLMENT_TRANSACTION, queryParams.get('installment'));
  }
}
