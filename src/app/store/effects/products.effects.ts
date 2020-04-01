import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {EProductsActions, GetProducts, GetProductsSuccess} from '../actions/products.actions';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../common/interfaces/product.interface';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {
  }

  @Effect()
  getProducts$ = this.actions.pipe(
    ofType<GetProducts>(EProductsActions.GetProducts),
    switchMap(() => this.productsService.getProducts()),
    switchMap((products: IProduct[]) => of(new GetProductsSuccess(products))),
  );
}

