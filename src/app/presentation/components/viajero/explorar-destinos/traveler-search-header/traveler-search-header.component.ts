import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import type { ExploreFilter } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';

@Component({
  selector: 'app-traveler-search-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './traveler-search-header.component.html',
  styleUrl: './traveler-search-header.component.css'
})
export class TravelerSearchHeaderComponent {
  @Output() search = new EventEmitter<ExploreFilter>();

  destino = signal('');
  fechas = signal('');
  viajeros = signal<number>(1);

  onSearch(): void {
    const payload: ExploreFilter = {} as ExploreFilter;
    // por ahora no hay mapeo de texto de búsqueda a filtros del UseCase
    this.search.emit(payload);
  }
}
