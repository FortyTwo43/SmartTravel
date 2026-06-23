import { Routes } from '@angular/router';
import { TravelerLayoutComponent } from './presentation/layouts/viajero/traveler-layout/traveler-layout.component';
import { ProveedorLayoutComponent } from './presentation/layouts/proveedor/proveedor-layout/proveedor-layout';
import { AdminLayoutComponent } from './presentation/layouts/admin/admin-layout/admin-layout';

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
    path: 'live',
    loadComponent: () => import('./presentation/pages/live-streams/live-streams-page/live-streams-page').then(m => m.LiveStreamsPageComponent)
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
        loadComponent: () => import('./presentation/pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
      }
      ,
      {
        path: 'explorar-destinos',
        loadComponent: () => import('./presentation/pages/viajero/explorar-destinos/explorar-destinos.component').then(m => m.ExplorarDestinosComponent)
      },
      {
        path: 'destinations/:id',
        loadComponent: () => import('./presentation/pages/viajero/detalle-destino/detalle-destino.component').then(m => m.DetalleDestinoComponent)
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
        path: 'reservations',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-reservations/proveedor-reservations').then(m => m.ProveedorReservationsComponent)
      },
      {
        path: 'services/new',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-service-form/proveedor-service-form').then(m => m.ProveedorServiceFormComponent)
      },
      {
        path: 'services/edit/:id',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-service-form/proveedor-service-form').then(m => m.ProveedorServiceFormComponent)
      },
      {
        path: 'statistics',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-estadisticas/proveedor-estadisticas.component').then(m => m.ProveedorEstadisticasComponent)
      },
      {
        path: 'establecimiento',
        loadComponent: () => import('./presentation/pages/proveedor/proveedor-establecimiento/proveedor-establecimiento').then(m => m.ProveedorEstablecimientoComponent)
      },
      {
        path: 'accessibility',
        loadComponent: () => import('./presentation/pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./presentation/pages/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'accessibility',
        loadComponent: () => import('./presentation/pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
      },
      {
        path: 'destinos',
        loadComponent: () => import('./presentation/pages/admin/admin-destinos/admin-destinos').then(m => m.AdminDestinosComponent)
      },
      {
        path: 'solicitudes',
        loadComponent: () => import('./presentation/pages/admin/admin-solicitudes/admin-solicitudes').then(m => m.AdminSolicitudesComponent)
      },
      {
        path: 'solicitudes/:id',
        loadComponent: () => import('./presentation/pages/admin/admin-solicitud-detail/admin-solicitud-detail').then(m => m.AdminSolicitudDetailComponent)
      },
      {
        path: 'destinos/new',
        loadComponent: () => import('./presentation/pages/admin/admin-destino-create/admin-destino-create').then(m => m.AdminDestinoCreateComponent)
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
