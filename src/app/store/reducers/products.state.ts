import {IProduct} from '../../common/interfaces/product.interface';
import {ILoadingStatus} from '../../common/interfaces/loading-status.interface';

export interface IProductsState {
  products: IProduct[];
  loading: ILoadingStatus;
  workWithProductId?: string;
}

export const initialState: IProductsState = {
  products: [],
  loading: {
    status: null,
    action: null,
  },
  workWithProductId: null,
};
