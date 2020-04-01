import {Action} from '@ngrx/store';
import {IProduct} from '../../common/interfaces/product.interface';

export enum EProductsActions {
  GetProducts = '[Products] Get Products',
  GetProductsSuccess = '[Products] Get Products Success',
  GetProductsError = '[Products] Get Products Error',
}

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

export type TProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError;
