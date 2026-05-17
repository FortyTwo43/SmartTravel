import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./presentation/pages/login/login-page.component').then(m => m.LoginPageComponent) 
  },
  {
    path: 'home',
    loadComponent: () => import('./presentation/pages/home/home').then(m => m.Home)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
