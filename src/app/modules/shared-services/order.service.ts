import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public placeOrder(payload: any): Observable<any> {
    payload.clientId = 1; // Temporary clientId, will be replaced by actual clientId after login implementation
    return this.http.post<any>(OrderUrls.placeOrder, payload);
  }

  public updateStatus(orderNumber: string, status: string): Observable<any> {
    return this.http.put(OrderUrls.updateStatus, { orderNumber:orderNumber, newStatus:status });
  }

  public getAllSaleOrders(): Observable<any> {
    return this.http.get(OrderUrls.getAllSaleOrder);
  }
}
