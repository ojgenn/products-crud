import {initialState, IProductsState} from './products.state';
import {EProductsActions, TProductsActions} from '../actions/products.actions';
import {ELoadingStatus} from '../../common/enums/loading-status.enum';
import {ELoadingActions} from '../../common/enums/loading-actions.enum';

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
    default:
      return state;
  }
}
