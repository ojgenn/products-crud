import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';

import {IAppState} from './common/interfaces/app-state.interface';
import {GetProducts} from './store/actions/get-products.actions';
import {getProducts} from './store/selectors/products.selector';
import {DeleteProduct} from './store/actions/delete-product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public products$ = this.store.pipe(select(getProducts));

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  public delete(id: string): void {
    this.store.dispatch(new DeleteProduct(id));
  }

}
