import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor-activity.html',
  styleUrl: './proveedor-activity.css'
})
export class ProveedorActivityComponent {
  activities = [
    { initials: 'JD', name: 'Julian Draxler', service: 'Luxury Suite King', pax: 2, status: 'Confirmada', colorClass: 'bg-primary-container' },
    { initials: 'SK', name: 'Sophie Klein', service: 'Full Spa Ritual', pax: 1, status: 'Pendiente', colorClass: 'bg-secondary-container' },
    { initials: 'AM', name: 'Alan Miller', service: 'Airport VIP Escort', pax: 4, status: 'Completada', colorClass: 'bg-surface-bright' },
  ];
}
