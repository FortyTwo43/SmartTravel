import { Component, input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorReservaItem } from '../../../../domain/ui/proveedor/reservas/ProveedorReservaItem';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Calendar, Users, CircleDollarSign } from 'lucide-angular';

@Component({
  selector: 'app-reserva-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    DatePipe,
    CurrencyPipe,
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Calendar, Users, CircleDollarSign })
    }
  ],
  templateUrl: './reserva-card.html',
  styleUrl: './reserva-card.css'
})
export class ReservaCard {
  reserva = input.required<ProveedorReservaItem>();
}
