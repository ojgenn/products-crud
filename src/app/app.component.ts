import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';

import {IAppState} from './common/interfaces/app-state.interface';
import {GetProducts} from './store/actions/products.actions';
import {getProducts} from './store/selectors/products.selector';

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

}
