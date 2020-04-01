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

    if (req.method === 'POST' && req.url === `${environment.serverUrl}/product`) {
      return of(new HttpResponse({status: 200, body: this.fakeRestApiService.addProduct(req.body)})).pipe(
        delay(300),
      );
    }

    if (req.method === 'DELETE' && req.url.includes(`${environment.serverUrl}/product`)) {
      const id: string = req.url.replace(`${environment.serverUrl}/product/`, '');

      return of(new HttpResponse({status: 200, body: this.fakeRestApiService.deleteProduct(id)})).pipe(
        delay(300),
      );
    }

    if (req.method === 'PUT' && req.url === `${environment.serverUrl}/product`) {
      return of(new HttpResponse({status: 200, body: this.fakeRestApiService.editProduct(req.body)})).pipe(
        delay(300),
      );
    }
    next.handle(req);
  }
}
