import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {EditComponent} from './components/edit/edit.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list'
  },
  {
    path: 'list',
    component: ProductsComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: '**',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
