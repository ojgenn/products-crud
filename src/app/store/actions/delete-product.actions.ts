import {Action} from '@ngrx/store';
import {EProductsActions} from './actions.enum';
import {IProduct} from '../../common/interfaces/product.interface';

export class DeleteProduct implements Action {
  public readonly type = EProductsActions.DeleteProduct;

  constructor(public payload: string) {
  }
}

export class DeleteProductSuccess implements Action {
  public readonly type = EProductsActions.DeleteProductSuccess;

  constructor(public payload: string) {
  }
}

export class DeleteProductError implements Action {
  public readonly type = EProductsActions.DeleteProductError;
}
