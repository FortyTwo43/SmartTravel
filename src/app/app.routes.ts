import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./presentation/pages/login/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./presentation/pages/register/register.component').then(m => m.default)
  },
  {
    path: 'traveler-onboarding',
    loadComponent: () => import('./presentation/pages/viajero/traveler-onboarding/traveler-onboarding.component').then(m => m.TravelerOnboardingComponent)
  },
  {
    path: 'traveler',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./presentation/pages/viajero/dashboard/traveler-dashboard.component').then(m => m.TravelerDashboardComponent)
      }
    ]
  },
  {
    path: 'accessibility',
    loadComponent: ()=> import('./presentation/pages/accessibility/accessibility.component'). then(m => m.AccessibilityComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./presentation/pages/home/home').then(m => m.Home)
  },
  {
    path: 'provider-dashboard',
    loadComponent: () => import('./presentation/pages/proveedor/proveedor-dashboard/proveedor-dashboard').then(m => m.ProveedorDashboardComponent)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
