import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardActividadReciente } from '../../../../domain/dashboard/DashboardActividadReciente';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-activity',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ UserRound }) }],
  templateUrl: './proveedor-activity.html',
  styleUrl: './proveedor-activity.css'
})
export class ProveedorActivityComponent {
  @Input() activities: DashboardActividadReciente[] = [];
}
