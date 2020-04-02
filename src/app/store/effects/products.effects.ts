import {Injectable} from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';

import {GetProducts, GetProductsError, GetProductsSuccess} from '../actions/get-products.actions';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../common/interfaces/product.interface';
import {EProductsActions} from '../actions/actions.enum';
import {AddProduct, AddProductError, AddProductSuccess} from '../actions/add-product.actions';
import {DeleteProduct, DeleteProductError, DeleteProductSuccess} from '../actions/delete-product.actions';
import {EditProduct, EditProductError, EditProductSuccess} from '../actions/edit-product.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {
  }

  @Effect()
  getProducts$ = this.actions.pipe(
    ofType<GetProducts>(EProductsActions.GetProducts),
    switchMap(() => this.productsService.getProducts()),
    switchMap((products: IProduct[]) => of(new GetProductsSuccess(products))),
    catchError(() => of(new GetProductsError())),
  );

  @Effect()
  addProduct$ = this.actions.pipe(
    ofType<AddProduct>(EProductsActions.AddProduct),
    switchMap((action) => this.productsService.addProduct(action.payload)),
    switchMap((product: IProduct) => of(new AddProductSuccess(product))),
    catchError(() => of(new AddProductError())),
  );

  @Effect()
  deleteProduct$ = this.actions.pipe(
    ofType<DeleteProduct>(EProductsActions.DeleteProduct),
    switchMap((action) => forkJoin([this.productsService.deleteProduct(action.payload), of(action.payload)])),
    switchMap(([_, id]: [void, string]) => of(new DeleteProductSuccess(id))),
    catchError(() => of(new DeleteProductError())),
  );

  @Effect()
  editProduct$ = this.actions.pipe(
    ofType<EditProduct>(EProductsActions.EditProduct),
    switchMap((action) => this.productsService.editProduct(action.payload)),
    switchMap((product: IProduct) => of(new EditProductSuccess(product))),
    catchError(() => of(new EditProductError())),
  );
}

