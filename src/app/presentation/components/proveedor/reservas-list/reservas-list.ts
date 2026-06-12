import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorReservaItem } from '../../../../domain/ui/proveedor/reservas/ProveedorReservaItem';
import { ReservaCard } from '../reserva-card/reserva-card';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Inbox } from 'lucide-angular';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReservaCard, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Inbox })
  }],
  templateUrl: './reservas-list.html',
  styleUrl: './reservas-list.css'
})
export class ReservasList {
  reservas = input.required<ProveedorReservaItem[]>();
  loading = input<boolean>(false);
}
