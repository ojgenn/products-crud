import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IProduct} from '../../common/interfaces/product.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  @Input() public productsList: IProduct[];

  @Output() public readonly deleteProduct: EventEmitter<string> = new EventEmitter();
  @Output() public readonly editProduct: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }


  public trackByFn(_: number, item: IProduct): string {
    return item.id;
  }

  public edit(id: string): void {
    this.editProduct.emit(id);
  }

  delete(id: string): void {
    this.deleteProduct.emit(id);
  }

}
