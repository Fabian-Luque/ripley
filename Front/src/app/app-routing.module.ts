import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// AUTH
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegistrationComponent } from './components/pages/auth/registration/registration.component';
import { AuthGuard } from './helpers/auth.guard';

import { HomeComponent } from './components/pages/home/home.component';
import { DepositComponent } from './components/pages/deposit/deposit.component';
import { WithdrawalMoneyComponent } from './components/pages/withdrawal-money/withdrawal-money.component';
import { MoneyTransferComponent } from './components/pages/money-transfer/money-transfer.component';


const routes: Routes = [

 {path: '', component: HomeComponent, canActivate: [AuthGuard]},
 {path: 'login', component: LoginComponent},
 {path: 'registration', component: RegistrationComponent},
 {path: 'home', component: HomeComponent},
 {path: 'deposit', component: DepositComponent},
 {path: 'withdrawal-money', component: WithdrawalMoneyComponent},
 {path: 'money-transfer', component: MoneyTransferComponent},

 { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
