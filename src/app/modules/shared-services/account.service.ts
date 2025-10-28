import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUrls } from 'src/app/utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) {}
  
    public getAllGlBalance(): Observable<any> {
      return this.http.get<any>(AccountUrls.getGlSumamry);
    }
}
