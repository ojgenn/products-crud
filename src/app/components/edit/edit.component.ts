import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IProduct} from '../../common/interfaces/product.interface';
import {EManageProductMode} from '../../common/enums/manage-product-mode.enum';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public product$: BehaviorSubject<IProduct> = new BehaviorSubject(null);
  public manageProductMode: typeof EManageProductMode = EManageProductMode;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.ngOnDestroy$),
    ).subscribe((res) => {
      const state: {navigationId: number, product: IProduct} = window.history.state;
      if ('product' in state) {
        this.product$.next(state.product);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

}
