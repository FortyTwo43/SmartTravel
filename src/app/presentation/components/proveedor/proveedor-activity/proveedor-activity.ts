import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proveedor-activity',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './proveedor-activity.html',
  styleUrl: './proveedor-activity.css'
})
export class ProveedorActivityComponent {
  activities = [
    { initials: 'JD', name: 'Julian Draxler', service: 'Luxury Suite King', pax: 2, status: 'aceptado', colorClass: 'bg-primary-container' },
    { initials: 'SK', name: 'Sophie Klein', service: 'Full Spa Ritual', pax: 1, status: 'pendiente', colorClass: 'bg-secondary-container' },
    { initials: 'AM', name: 'Alan Miller', service: 'Airport VIP Escort', pax: 4, status: 'rechazado', colorClass: 'bg-surface-bright' },
  ];
}
