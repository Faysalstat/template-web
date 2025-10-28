import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  public addStock(payload: any): Observable<any> {
    payload.clientId = 1; // Temporary clientId, will be replaced by actual clientId after login implementation
    return this.http.post<any>(InventoryUrls.addStock, payload);
  }
  public getAllSupplyOrders(): Observable<any> {
    return this.http.get(InventoryUrls.getAllSupplyOrder);
  }
}
