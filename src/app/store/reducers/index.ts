import {
  ActionReducerMap,
} from '@ngrx/store';

import {productsReducer} from './products-reducer';
import {IAppState} from '../../common/interfaces/app-state.interface';

export const reducers: ActionReducerMap<IAppState, any> = {
  products: productsReducer,
};

