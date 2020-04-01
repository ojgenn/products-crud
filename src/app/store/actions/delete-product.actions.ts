import {Action} from '@ngrx/store';
import {EProductsActions} from './actions.enum';

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
