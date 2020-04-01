import {GetProducts, GetProductsError, GetProductsSuccess} from './get-products.actions';
import {AddProduct, AddProductError, AddProductSuccess} from './add-product.actions';
import {DeleteProduct, DeleteProductError, DeleteProductSuccess} from './delete-product.actions';

export type TProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError
  | AddProduct
  | AddProductSuccess
  | AddProductError
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductError;
