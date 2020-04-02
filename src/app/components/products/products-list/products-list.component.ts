import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {IProduct} from '../../../common/interfaces/product.interface';
import {ILoadingStatus} from '../../../common/interfaces/loading-status.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../common/interfaces/app-state.interface';
import {getLoading} from '../../../store/selectors/products.selector';
import {takeUntil} from 'rxjs/operators';
import {ELoadingActions} from '../../../common/enums/loading-actions.enum';
import {ELoadingStatus} from '../../../common/enums/loading-status.enum';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
  @Input() public productsList: IProduct[];
  @Input() public workWithProductId: string;

  @Output() public readonly deleteProduct: EventEmitter<string> = new EventEmitter();
  @Output() public readonly editProduct: EventEmitter<IProduct> = new EventEmitter();

  private ngOnDestroy$: Subject<void> = new Subject();

  public showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getLoading)).pipe(
      takeUntil(this.ngOnDestroy$),
    ).subscribe((loading: ILoadingStatus) => {
      this.showSpinner$.next(
        loading?.action === ELoadingActions.DELETE_PRODUCT &&
        loading?.status === ELoadingStatus.PENDING
      );
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public trackByFn(_: number, item: IProduct): string {
    return item.id;
  }

  public edit(product: IProduct): void {
    this.editProduct.emit(product);
  }

  public delete(id: string): void {
    this.deleteProduct.emit(id);
  }

}
