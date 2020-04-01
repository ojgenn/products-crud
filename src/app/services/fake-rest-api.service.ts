import {Injectable} from '@angular/core';

import {IProduct} from '../common/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeRestApiService {
  public getProducts(): IProduct[] {
    const productsFromBackend = localStorage.getItem('products');
    return  productsFromBackend ? JSON.parse(productsFromBackend) : [];
  }
}
