import { Component, input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorReservaItem } from '../../../../domain/ui/proveedor/reservas/ProveedorReservaItem';

@Component({
  selector: 'app-reserva-row',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './reserva-row.html',
  styleUrl: './reserva-row.css'
})
export class ReservaRow {
  reserva = input.required<ProveedorReservaItem>();
}
