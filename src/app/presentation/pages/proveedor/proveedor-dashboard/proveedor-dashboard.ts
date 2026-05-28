import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorLayoutComponent } from '../../../layouts/proveedor-layout/proveedor-layout';
import { ProveedorMetricsComponent } from '../../../components/proveedor-metrics/proveedor-metrics';
import { ProveedorChartPlaceholderComponent } from '../../../components/proveedor-chart-placeholder/proveedor-chart-placeholder';
import { ProveedorActivityComponent } from '../../../components/proveedor-activity/proveedor-activity';
import { ProveedorInsightsComponent } from '../../../components/proveedor-insights/proveedor-insights';
import { ProveedorServicesComponent } from '../../../components/proveedor-services/proveedor-services';

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
}
