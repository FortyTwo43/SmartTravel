import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Grid, List, Edit2, LineChart, Power } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Grid, List, Edit2, LineChart, Power })
  }],
  templateUrl: './proveedor-services.html',
  styleUrl: './proveedor-services.css'
})
export class ProveedorServicesComponent {
  services = [
    { title: 'Skyline Infinity Pool Access', desc: 'Acceso exclusivo al 24º piso.', res: 482, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Balinese Massage Journey', desc: 'Tratamiento integral de 120 min.', res: 324, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Tasting Menu "Solaris"', desc: '6 tiempos con maridaje.', res: 891, status: 'ALTA DEMANDA', statusClass: 'status-amber' },
    { title: 'Helicopter Island Tour', desc: 'Sobrevuelo de 45 minutos.', res: 128, status: 'OPERATIVO', statusClass: 'status-green' }
  ];
}
