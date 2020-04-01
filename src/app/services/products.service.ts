import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {IProduct} from '../common/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.serverUrl}/products`);
  }
}
