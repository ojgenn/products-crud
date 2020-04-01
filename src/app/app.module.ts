import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {reducers} from './store/reducers';
import { environment } from '../environments/environment';
import {AppInterceptor} from './services/app.interceptor';
import { EffectsModule } from '@ngrx/effects';
import {ProductsEffects} from './store/effects/products.effects';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UnitsPipe } from './pipes/units.pipe';
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
