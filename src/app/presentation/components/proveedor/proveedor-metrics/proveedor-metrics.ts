import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Info } from 'lucide-angular';
import { MetricCardComponent } from '../../ui/metric-card/metric-card';

@Component({
  selector: 'app-proveedor-metrics',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MetricCardComponent],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Info })
  }],
  templateUrl: './proveedor-metrics.html',
  styleUrl: './proveedor-metrics.css'
})
export class ProveedorMetricsComponent {
}
