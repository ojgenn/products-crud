import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {select, Store} from '@ngrx/store';

import {EUnits} from '../../common/enums/units.enum';
import {ISelect} from '../../common/interfaces/select.interface';
import {getUnits} from '../../common/helpers/get-units';
import {regex} from '../../common/helpers/regex';
import {AddProduct} from '../../store/actions/add-product.actions';
import {Product} from '../../common/models/product.model';
import {IAppState} from '../../common/interfaces/app-state.interface';
import {getLoading} from '../../store/selectors/products.selector';
import {filter, takeUntil} from 'rxjs/operators';
import {ELoadingActions} from '../../common/enums/loading-actions.enum';
import {Subject} from 'rxjs';
import {ILoadingStatus} from '../../common/interfaces/loading-status.interface';
import {ELoadingStatus} from '../../common/enums/loading-status.enum';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public units: ISelect<EUnits>[];
  public form: FormGroup;
  public loading$ = this.store.pipe(select(getLoading)).pipe(
    filter((loading) => loading.action === ELoadingActions.ADD_PRODUCT),
  );

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {
  }

  ngOnInit(): void {
    this.units = getUnits();
    this.form = this.initForm();

    this.watchLoadingStatus();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private watchLoadingStatus(): void {
    this.loading$.pipe(
      takeUntil(this.ngOnDestroy$),
    ).subscribe((loading: ILoadingStatus) => {
      if (loading.status === ELoadingStatus.SUCCESS) {
        this.form.patchValue({
          name: '',
          url: '',
          units: '',
        });

        this.form.updateValueAndValidity();
      }
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regex.name)]],
      url: ['', [Validators.required, Validators.pattern(regex.safe)]],
      units: ['', [Validators.required]],
    });
  }

  public submit(form: FormGroup) {
    if (form.valid) {
      const product = new Product();
      product.name = form.get('name').value;
      product.img = form.get('url').value;
      product.units = form.get('units').value;
      this.store.dispatch(new AddProduct(product));
    }
  }
}
