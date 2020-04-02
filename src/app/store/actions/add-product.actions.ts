import {Action} from '@ngrx/store';

import {EProductsActions} from './actions.enum';
import {IProduct} from '../../common/interfaces/product.interface';

export class AddProduct implements Action {
  public readonly type = EProductsActions.AddProduct;

  constructor(public payload: IProduct) {
  }
}

export class AddProductSuccess implements Action {
  public readonly type = EProductsActions.AddProductSuccess;

  constructor(public payload: IProduct) {
  }
}

export class AddProductError implements Action {
  public readonly type = EProductsActions.AddProductError;
}
