import { TokenInterceptor } from './services/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { PositionsFormComponent } from './components/categories-form/positions-form/positions-form.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { HistoryListComponent } from './components/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './components/history-page/history-filter/history-filter.component';

@NgModule({
  declarations: [
    LayoutComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderPositionsComponent,
    OrderCategoriesComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: TokenInterceptor
      }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
