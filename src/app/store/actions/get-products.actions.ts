import {Action} from '@ngrx/store';
import {IProduct} from '../../common/interfaces/product.interface';
import {EProductsActions} from './actions.enum';

export class GetProducts implements Action {
  public readonly type = EProductsActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  public readonly type = EProductsActions.GetProductsSuccess;

  constructor(public payload: IProduct[]) {
  }
}

export class GetProductsError implements Action {
  public readonly type = EProductsActions.GetProductsError;
}

