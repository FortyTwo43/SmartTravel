import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import type { ExploreFilter } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Umbrella, Mountain, Building, Home } from 'lucide-angular';

@Component({
  selector: 'app-traveler-filter-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Umbrella, Mountain, Building, Home })
    }
  ],
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

  setPrice(min: number | null, max: number | null) {
    this.minPrice.set(min);
    this.maxPrice.set(max);
    this.emitFilters();
  }

  setExperiencia(exp: string | null) {
    if (this.experiencia() === exp) {
      this.experiencia.set(null); // deselect
    } else {
      this.experiencia.set(exp);
    }
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
