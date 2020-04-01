import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {IProduct} from '../../../common/interfaces/product.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  @Input() public productsList: IProduct[];

  @Output() public readonly deleteProduct: EventEmitter<string> = new EventEmitter();
  @Output() public readonly editProduct: EventEmitter<IProduct> = new EventEmitter();

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
