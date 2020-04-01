import {Action} from '@ngrx/store';
import {EProductsActions} from './actions.enum';
import {IProduct} from '../../common/interfaces/product.interface';

export class EditProduct implements Action {
  public readonly type = EProductsActions.EditProduct;

  constructor(public payload: IProduct) {
  }
}

export class EditProductSuccess implements Action {
  public readonly type = EProductsActions.EditProductSuccess;

  constructor(public payload: IProduct) {
  }
}

export class EditProductError implements Action {
  public readonly type = EProductsActions.EditProductError;
}
