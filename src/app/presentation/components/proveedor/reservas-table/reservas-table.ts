import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorReservaItem } from '../../../../domain/ui/proveedor/reservas/ProveedorReservaItem';
import { ReservaRow } from '../reserva-row/reserva-row';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Inbox } from 'lucide-angular';

@Component({
  selector: 'app-reservas-table',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReservaRow, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Inbox })
  }],
  templateUrl: './reservas-table.html',
  styleUrl: './reservas-table.css'
})
export class ReservasTable {
  reservas = input.required<ProveedorReservaItem[]>();
  loading = input<boolean>(false);
}
