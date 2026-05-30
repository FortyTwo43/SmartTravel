import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardTipoViaje } from '../../../../../domain/ui/proveedor/dashboard/DashboardTipoViaje';

@Component({
  selector: 'app-proveedor-insights',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './proveedor-insights.html',
  styleUrl: './proveedor-insights.css'
})
export class ProveedorInsightsComponent {
  @Input() tipoViaje: DashboardTipoViaje | null = null;

  get total(): number {
    if (!this.tipoViaje) return 1;
    return (this.tipoViaje.pareja + this.tipoViaje.familia + this.tipoViaje.amigos + this.tipoViaje.solo) || 1;
  }

  pct(value: number): number {
    return Math.round((value / this.total) * 100);
  }
}
