import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClientInterceptor implements HttpInterceptor {

  private clientId = '1'; // you can also load this dynamically

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add clientId header
    const clonedRequest = req.clone({
      setHeaders: {
        'clientId': this.clientId
      }
    });

    return next.handle(clonedRequest);
  }
}
