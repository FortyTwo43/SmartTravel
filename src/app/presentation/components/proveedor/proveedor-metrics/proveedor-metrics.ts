import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MetricCardComponent } from '../../ui/metric-card/metric-card';

import { DashboardKpis } from '../../../../domain/entities/DashboardKpis';

export interface MetricCardConfig {
  label: string;
  value: string;
  valueColorClass: string;
  progressPercent: number;
  progressColorClass: string;
  progressOpacity?: number;
}
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
    if (!this.kpis) return '$0k';
    return '$' + (this.kpis.ingresos_totales / 1000).toFixed(0) + 'k';
  }
}
