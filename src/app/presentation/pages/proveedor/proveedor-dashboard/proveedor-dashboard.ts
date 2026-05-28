import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorLayoutComponent } from '../../../layouts/proveedor/proveedor-layout/proveedor-layout';
import { ProveedorMetricsComponent } from '../../../components/proveedor/proveedor-metrics/proveedor-metrics';
import { ProveedorChartPlaceholderComponent } from '../../../components/proveedor/proveedor-chart-placeholder/proveedor-chart-placeholder';
import { ProveedorActivityComponent } from '../../../components/proveedor/proveedor-activity/proveedor-activity';
import { ProveedorInsightsComponent, TravelTypeStat } from '../../../components/proveedor/proveedor-insights/proveedor-insights';
import { ProveedorServicesComponent } from '../../../components/proveedor/proveedor-services/proveedor-services';
import { MetricItem } from '../../../components/proveedor/proveedor-metrics/proveedor-metrics';

@Component({
  selector: 'app-proveedor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProveedorLayoutComponent,
    ProveedorMetricsComponent,
    ProveedorChartPlaceholderComponent,
    ProveedorActivityComponent,
    ProveedorInsightsComponent,
    ProveedorServicesComponent
  ],
  templateUrl: './proveedor-dashboard.html',
  styleUrl: './proveedor-dashboard.css'
})
export class ProveedorDashboardComponent {
  metricsData: MetricItem[] = [
    {
      label: 'PROVIDER_DASHBOARD.METRICS.MONTHLY_RESERVATIONS',
      value: '1,284',
      valueColorClass: 'text-primary',
      trend: '+12%',
      trendColorClass: 'text-secondary',
      progressPercent: 75,
      progressColorClass: 'bg-primary'
    },
    {
      label: 'PROVIDER_DASHBOARD.METRICS.TOTAL_REVENUE',
      value: '$142k',
      valueColorClass: 'text-secondary',
      trend: '+8.4%',
      trendColorClass: 'text-secondary',
      progressPercent: 85,
      progressColorClass: 'bg-secondary'
    },
    {
      label: 'PROVIDER_DASHBOARD.METRICS.ACTIVE_SERVICES',
      value: '42',
      progressPercent: 100,
      progressColorClass: 'bg-muted',
      progressOpacity: 0.2
    },
    {
      label: 'PROVIDER_DASHBOARD.METRICS.AVAILABILITY',
      value: '94%',
      trend: '+4%',
      trendColorClass: 'text-secondary',
      progressPercent: 94,
      progressColorClass: 'bg-tertiary'
    },
    {
      label: 'PROVIDER_DASHBOARD.METRICS.CANCELLATION_RATE',
      value: '2.1%',
      valueColorClass: 'text-error',
      trend: '-0.5%',
      trendColorClass: 'text-error',
      progressPercent: 15,
      progressColorClass: 'bg-error'
    }
  ];

  insightsTravelStats: TravelTypeStat[] = [
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.COUPLE', percentage: 54, textColorClass: 'text-primary', bgColorClass: 'bg-primary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.FAMILY', percentage: 32, textColorClass: 'text-secondary', bgColorClass: 'bg-secondary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.FRIENDS', percentage: 10, textColorClass: 'text-tertiary', bgColorClass: 'bg-tertiary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.SOLO', percentage: 4, textColorClass: 'text-muted', bgColorClass: 'bg-muted' }
  ];
  insightsInterests = [
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.GASTRONOMY',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.ADVENTURE',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.WELLNESS',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.CULTURE',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.SUSTAINABILITY'
  ];

  activityData = [
    { initials: 'JD', name: 'Julian Draxler', service: 'Luxury Suite King', pax: 2, status: 'aceptado', colorClass: 'bg-primary-container' },
    { initials: 'SK', name: 'Sophie Klein', service: 'Full Spa Ritual', pax: 1, status: 'pendiente', colorClass: 'bg-secondary-container' },
    { initials: 'AM', name: 'Alan Miller', service: 'Airport VIP Escort', pax: 4, status: 'rechazado', colorClass: 'bg-surface-bright' },
    { initials: 'AM', name: 'Alan Miller', service: 'Airport VIP Escort', pax: 4, status: 'rechazado', colorClass: 'bg-surface-bright' }
  ];

  servicesData = [
    { title: 'Skyline Infinity Pool Access', desc: 'Acceso exclusivo al 24º piso.', res: 482, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Balinese Massage Journey', desc: 'Tratamiento integral de 120 min.', res: 324, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Tasting Menu "Solaris"', desc: '6 tiempos con maridaje.', res: 891, status: 'ALTA DEMANDA', statusClass: 'status-amber' },
    { title: 'Helicopter Island Tour', desc: 'Sobrevuelo de 45 minutos.', res: 128, status: 'OPERATIVO', statusClass: 'status-green' }
  ];
}
