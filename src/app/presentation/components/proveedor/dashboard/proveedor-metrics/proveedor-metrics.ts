import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MetricCardComponent } from '../../../ui/metric-card/metric-card';

import { DashboardKpis } from '../../../../../domain/ui/proveedor/dashboard/DashboardKpis';

@Component({
  selector: 'app-proveedor-metrics',
  standalone: true,
  imports: [CommonModule, MetricCardComponent, TranslateModule],
  templateUrl: './proveedor-metrics.html',
  styleUrl: './proveedor-metrics.css'
})
export class ProveedorMetricsComponent {
  @Input() kpis: DashboardKpis | null = null;

  get formattedIngresos(): string {
    if (!this.kpis) return '$0';
    const value = this.kpis.ingresos_totales;
    if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + 'M';
    if (value >= 1_000) return '$' + (value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1) + 'k';
    return '$' + value;
  }
}
