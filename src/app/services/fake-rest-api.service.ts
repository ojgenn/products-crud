import {Injectable} from '@angular/core';

import * as uuid from 'uuid';

import {IProduct} from '../common/interfaces/product.interface';
import {Product} from '../common/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FakeRestApiService {
  public getProducts(): IProduct[] {
    const productsFromBackend: string = localStorage.getItem('products');
    return productsFromBackend ? JSON.parse(productsFromBackend) : [];
  }

  public addProduct(rowProduct: IProduct): IProduct {
    const productsFromBackend: string = localStorage.getItem('products');
    const state: IProduct[] = productsFromBackend ? JSON.parse(productsFromBackend) : [];

    const product = new Product();
    product.id = uuid.v4();
    product.name = rowProduct.name;
    product.img = rowProduct.img;
    product.units = rowProduct.units;

    state.push(product);
    localStorage.setItem('products', JSON.stringify(state));

    return product;
  }

}
