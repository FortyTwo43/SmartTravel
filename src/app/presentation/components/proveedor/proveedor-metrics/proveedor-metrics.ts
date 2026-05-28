import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MetricCardComponent } from '../../ui/metric-card/metric-card';

export interface MetricItem {
  label: string;
  value: string | number;
  valueColorClass?: string;
  trend?: string;
  trendColorClass?: string;
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
  @Input() metrics: MetricItem[] = [];
}
