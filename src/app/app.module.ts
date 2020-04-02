import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {reducers} from './store/reducers';
import {ProductsEffects} from './store/effects/products.effects';
import { environment } from '../environments/environment';
import {AppInterceptor} from './services/app.interceptor';
import { UnitsPipe } from './pipes/units.pipe';
import {AppComponent} from './app.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { EditComponent } from './components/edit/edit.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageProductComponent,
    ProductsListComponent,
    UnitsPipe,
    UnitsPipe,
    EditComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ProductsEffects]),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
