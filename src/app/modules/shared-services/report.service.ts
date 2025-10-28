import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  getTransactionReport() {
    return this.http.get<any[]>(ReportUrls.getTransactionReport);
  }
}
