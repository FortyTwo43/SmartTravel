import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorLayoutComponent } from '../../../layouts/proveedor-layout/proveedor-layout';
import { ProveedorMetricsComponent } from '../../../components/proveedor/proveedor-metrics/proveedor-metrics';
import { ProveedorChartPlaceholderComponent } from '../../../components/proveedor/proveedor-chart-placeholder/proveedor-chart-placeholder';
import { ProveedorActivityComponent } from '../../../components/proveedor/proveedor-activity/proveedor-activity';
import { ProveedorInsightsComponent } from '../../../components/proveedor/proveedor-insights/proveedor-insights';
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
}
