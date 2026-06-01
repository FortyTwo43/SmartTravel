import { Routes } from '@angular/router';
import { TravelerLayoutComponent } from './presentation/layouts/viajero/traveler-layout/traveler-layout.component';
import { ProveedorLayoutComponent } from './presentation/layouts/proveedor/proveedor-layout/proveedor-layout';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./presentation/pages/home/home').then(m => m.Home)
  },
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
    component: TravelerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./presentation/pages/viajero/dashboard/traveler-dashboard.component').then(m => m.TravelerDashboardComponent)
      },
      {
        path: 'accessibility',
        loadComponent: ()=> import('./presentation/pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
      }
    ]
  },
  {
    path: 'provider',
    component: ProveedorLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-dashboard/proveedor-dashboard').then(m => m.ProveedorDashboardComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-services/proveedor-services').then(m => m.ProveedorServicesPageComponent)
      },
      {
        path: 'services/new',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-service-form/proveedor-service-form').then(m => m.ProveedorServiceFormComponent)
      },
      {
        path: 'accessibility',
        loadComponent: ()=> import('./presentation/pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
