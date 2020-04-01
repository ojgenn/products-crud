import {createSelector} from '@ngrx/store';

import {IAppState} from '../../common/interfaces/app-state.interface';
import {IProductsState} from '../reducers/products.state';

const productsState = (state: IAppState) => state.products;

export const getProducts = createSelector(
  productsState,
  (state: IProductsState) => state.products,
);

export const getLoading = createSelector(
  productsState,
  (state: IProductsState) => state.loading,
);
