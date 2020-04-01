import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {FakeRestApiService} from './fake-rest-api.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private fakeRestApiService: FakeRestApiService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url === `${environment.serverUrl}/products`) {
      return of(new HttpResponse({status: 200, body: this.fakeRestApiService.getProducts()})).pipe(
        delay(300),
      );
    }
    next.handle(req);
  }
}
