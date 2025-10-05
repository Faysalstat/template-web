import { HttpClient, HttpEvent, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderUrls } from '../components/dashboard/product/service/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public placeOrder(payload:any): Observable<any> {
      payload.clientId = 1; // Temporary clientId, will be replaced by actual clientId after login implementation
      return this.http.post<any>(OrderUrls.placeOrder, payload);
  }

    public updateStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(OrderUrls.updateStatus, { status });
  }
}