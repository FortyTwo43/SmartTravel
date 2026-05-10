import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./presentation/pages/login/login-page.component').then(m => m.LoginPageComponent) 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
