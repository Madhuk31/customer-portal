import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Invoice } from './invoice/invoice';
import { Payments } from './payments/payments';
import { CreditMemo } from './credit-memo/credit-memo';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'invoice', component: Invoice },
  { path: 'payments', component: Payments },
  { path: 'credit-memo', component: CreditMemo }
];
