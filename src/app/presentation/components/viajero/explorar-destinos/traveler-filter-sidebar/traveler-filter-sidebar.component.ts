import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import type { ExploreFilter } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';

@Component({
  selector: 'app-traveler-filter-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './traveler-filter-sidebar.component.html',
  styleUrl: './traveler-filter-sidebar.component.css'
})
export class TravelerFilterSidebarComponent {
  @Output() applyFilters = new EventEmitter<ExploreFilter>();

  categorias = signal<string[]>([]);
  experiencia = signal<string | null>(null);
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);

  toggleCategoria(cat: string) {
    const current = this.categorias();
    if (current.includes(cat)) {
      this.categorias.set(current.filter(c => c !== cat));
    } else {
      this.categorias.set([...current, cat]);
    }
    this.emitFilters();
  }

  setPrice(min?: number | null, max?: number | null) {
    this.minPrice.set(min ?? null);
    this.maxPrice.set(max ?? null);
    this.emitFilters();
  }

  setExperiencia(exp: string | null) {
    this.experiencia.set(exp);
    this.emitFilters();
  }

  emitFilters() {
    const payload: ExploreFilter = {
      minPrice: this.minPrice() ?? undefined,
      maxPrice: this.maxPrice() ?? undefined,
      categorias: this.categorias().length ? this.categorias() : undefined,
      experiencia: this.experiencia() ?? undefined
    } as ExploreFilter;
    this.applyFilters.emit(payload);
  }
}
