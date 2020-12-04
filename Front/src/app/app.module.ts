import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// AUTH
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegistrationComponent } from './components/pages/auth/registration/registration.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { DepositComponent } from './components/pages/deposit/deposit.component';
import { WithdrawalMoneyComponent } from './components/pages/withdrawal-money/withdrawal-money.component';
import { MoneyTransferComponent } from './components/pages/money-transfer/money-transfer.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreLoaderComponent } from './components/layouts/pre-loader/pre-loader.component';
import { SideNavbarComponent } from './components/layouts/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './components/layouts/top-navbar/top-navbar.component';
import { HomeComponent } from './components/pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    TopNavbarComponent,
    DepositComponent,
    WithdrawalMoneyComponent,
    MoneyTransferComponent,
    PreLoaderComponent,
    SideNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
