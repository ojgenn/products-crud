import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {EUnits} from '../../../common/enums/units.enum';
import {ISelect} from '../../../common/interfaces/select.interface';
import {getUnits} from '../../../common/helpers/get-units';
import {regex} from '../../../common/helpers/regex';
import {AddProduct} from '../../../store/actions/add-product.actions';
import {Product} from '../../../common/models/product.model';
import {IAppState} from '../../../common/interfaces/app-state.interface';
import {getLoading} from '../../../store/selectors/products.selector';
import {ELoadingActions} from '../../../common/enums/loading-actions.enum';
import {ILoadingStatus} from '../../../common/interfaces/loading-status.interface';
import {ELoadingStatus} from '../../../common/enums/loading-status.enum';
import {IProduct} from '../../../common/interfaces/product.interface';
import {EManageProductMode} from '../../../common/enums/manage-product-mode.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProductComponent implements OnInit, OnDestroy, OnChanges {
  @Input() private product: IProduct;
  @Input() public mode: EManageProductMode;

  private ngOnDestroy$: Subject<void> = new Subject();

  public units: ISelect<EUnits>[];
  public form: FormGroup;
  public manageMode: typeof EManageProductMode = EManageProductMode;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.units = getUnits();
    this.form = this.initForm();

    if (this.mode === EManageProductMode.EDIT && this.product) {
      this.updateForm();
    }

    this.watchLoadingStatus();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('mode' in changes && !this.product) {
      this.router.navigateByUrl('/list');
    }
  }

  private watchLoadingStatus(): void {
    this.store.pipe(select(getLoading)).pipe(
      filter((loading) => loading.action === ELoadingActions.ADD_PRODUCT),
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

  private updateForm(): void {
    this.form.patchValue({
      name: this.product.name,
      url: this.product.img,
      units: this.product.units,
    });
  }

  private manageProduct(form: FormGroup): void {
    const product = new Product();
    product.name = form.get('name').value;
    product.img = form.get('url').value;
    product.units = form.get('units').value;

    if (this.mode === EManageProductMode.ADD) {
      this.addProduct(product);
    } else {
      product.id = this.product.id;
      this.editProduct(product);
    }
  }

  private editProduct(product: IProduct): void {
    console.log(product);
  }

  private addProduct(product: IProduct): void {
    this.store.dispatch(new AddProduct(product));
  }

  public submit(form: FormGroup) {
    if (form.valid) {
      this.manageProduct(form);
    }
  }
}
