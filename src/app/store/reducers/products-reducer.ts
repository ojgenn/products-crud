import {initialState, IProductsState} from './products.state';
import {ELoadingStatus} from '../../common/enums/loading-status.enum';
import {ELoadingActions} from '../../common/enums/loading-actions.enum';
import {EProductsActions} from '../actions/actions.enum';
import {TProductsActions} from '../actions/products.types';

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
      return {...state, loading: {
          action: ELoadingActions.ADD_PRODUCT,
          status: ELoadingStatus.PENDING,
        }};
    case EProductsActions.AddProductSuccess:
      return {
        products: [...state.products, action.payload],
        loading: {
          action: ELoadingActions.ADD_PRODUCT,
          status: ELoadingStatus.SUCCESS
        }
      };
    case EProductsActions.AddProductError:
      return {...state, loading: {
          action: ELoadingActions.GET_PRODUCTS,
          status: ELoadingStatus.ERROR,
        }};
    default:
      return state;
  }
}
