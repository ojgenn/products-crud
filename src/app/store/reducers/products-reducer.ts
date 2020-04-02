import {initialState, IProductsState} from './products.state';
import {ELoadingStatus} from '../../common/enums/loading-status.enum';
import {ELoadingActions} from '../../common/enums/loading-actions.enum';
import {EProductsActions} from '../actions/actions.enum';
import {TProductsActions} from '../actions/products.types';
import {IProduct} from '../../common/interfaces/product.interface';

export function productsReducer(state: IProductsState = initialState, action: TProductsActions): IProductsState {
  switch (action.type) {
    case EProductsActions.GetProducts:
      return {
        ...state, loading: {
          action: ELoadingActions.GET_PRODUCTS,
          status: ELoadingStatus.PENDING,
        }
      };
    case EProductsActions.GetProductsSuccess:
      return {
        products: action.payload, loading: {
          action: ELoadingActions.GET_PRODUCTS,
          status: ELoadingStatus.SUCCESS,
        }
      };
    case EProductsActions.GetProductsError:
      return {
        ...state, loading: {
          action: ELoadingActions.GET_PRODUCTS,
          status: ELoadingStatus.ERROR,
        }
      };
    case EProductsActions.AddProduct:
      return {
        ...state, loading: {
          action: ELoadingActions.ADD_PRODUCT,
          status: ELoadingStatus.PENDING,
        }
      };
    case EProductsActions.AddProductSuccess:
      return {
        products: [...state.products, action.payload],
        loading: {
          action: ELoadingActions.ADD_PRODUCT,
          status: ELoadingStatus.SUCCESS
        }
      };
    case EProductsActions.AddProductError:
      return {
        ...state, loading: {
          action: ELoadingActions.ADD_PRODUCT,
          status: ELoadingStatus.ERROR,
        }
      };
    case EProductsActions.DeleteProduct:
      return {
        ...state, loading: {
          action: ELoadingActions.DELETE_PRODUCT,
          status: ELoadingStatus.PENDING,
        },
        workWithProductId: action.payload,
      };
    case EProductsActions.DeleteProductSuccess:
      const modifiedState: IProduct[] = [...state.products].filter((item: IProduct) => item.id !== action.payload);
      return {
        products: modifiedState, loading: {
          action: ELoadingActions.DELETE_PRODUCT,
          status: ELoadingStatus.SUCCESS,
        },
        workWithProductId: null,
      };
    case EProductsActions.DeleteProductError:
      return {
        ...state, loading: {
          action: ELoadingActions.DELETE_PRODUCT,
          status: ELoadingStatus.ERROR,
        }
      };
    case EProductsActions.EditProduct:
      return {
        ...state, loading: {
          action: ELoadingActions.EDIT_PRODUCT,
          status: ELoadingStatus.PENDING,
        }
      };
    case EProductsActions.EditProductSuccess:
      const stateToEdit: IProduct[] = [...state.products];
      const productIndex: number = stateToEdit.findIndex((item: IProduct) => item.id === action.payload.id);
      if (productIndex >= 0) {
        stateToEdit[productIndex] = action.payload;
      }

      return {
        products: stateToEdit, loading: {
          action: ELoadingActions.EDIT_PRODUCT,
          status: ELoadingStatus.SUCCESS,
        }
      };
    case EProductsActions.EditProductError:
      return {
        ...state, loading: {
          action: ELoadingActions.EDIT_PRODUCT,
          status: ELoadingStatus.ERROR,
        }
      };
    default:
      return state;
  }
}
