import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getProducts} from '../../store/selectors/products.selector';
import {IAppState} from '../../common/interfaces/app-state.interface';
import {GetProducts} from '../../store/actions/get-products.actions';
import {DeleteProduct} from '../../store/actions/delete-product.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public products$ = this.store.pipe(select(getProducts));

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  public delete(id: string): void {
    this.store.dispatch(new DeleteProduct(id));
  }

  public edit(id: string): void {
    //
  }
}
