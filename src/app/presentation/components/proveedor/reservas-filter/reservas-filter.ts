import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Filter } from 'lucide-angular';

@Component({
  selector: 'app-reservas-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Filter })
  }],
  templateUrl: './reservas-filter.html',
  styleUrl: './reservas-filter.css'
})
export class ReservasFilter {
  establecimientos = input<EstablecimientoTuristico[]>([]);
  selectedEstablecimientoId = input<string | null>(null);
  serviciosNombres = input<string[]>([]);

  establecimientoChange = output<string>();
  filtersChange = output<{ servicioNombre?: string, estado?: string, fecha?: string }>();

  selectedServicio = signal<string>('');
  selectedEstado = signal<string>('');
  selectedFecha = signal<string>('');

  onEstablecimientoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.establecimientoChange.emit(target.value);
    // Reset filters on establishment change
    this.selectedServicio.set('');
    this.selectedEstado.set('');
    this.selectedFecha.set('');
    this.emitFilters();
  }

  onFilterChange() {
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChange.emit({
      servicioNombre: this.selectedServicio() || undefined,
      estado: this.selectedEstado() || undefined,
      fecha: this.selectedFecha() || undefined
    });
  }
}
