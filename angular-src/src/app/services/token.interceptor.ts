import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  sheetUrl = new RegExp("https://sheets.googleapis.com*");
  getreq = new RegExp("192.168.0.101:5999/v1/SearchService*")

  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(request);
    // if(!this.sheetUrl.test(request.url))
    // {
      console.log("inside if of interceptor");
      request = request.clone(
        {
      setHeaders: {
        'Authorization': `${this.auth.getToken()}`
      }}
    );
    //}
    console.log(request);
    return next.handle(request);
  }
}
