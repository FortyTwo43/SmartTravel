import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Grid, List, Edit2, LineChart, Power } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardServicioMasDemandado } from '../../../../domain/dashboard/DashboardServicioMasDemandado';

@Component({
  selector: 'app-proveedor-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Grid, List, Edit2, LineChart, Power })
  }],
  templateUrl: './proveedor-services.html',
  styleUrl: './proveedor-services.css'
})
export class ProveedorServicesComponent {
  @Input() services: DashboardServicioMasDemandado[] = [];
}
