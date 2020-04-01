import {GetProducts, GetProductsError, GetProductsSuccess} from './get-products.actions';
import {AddProduct, AddProductError, AddProductSuccess} from './add-product.actions';

export type TProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError
  | AddProduct
  | AddProductSuccess
  | AddProductError;
