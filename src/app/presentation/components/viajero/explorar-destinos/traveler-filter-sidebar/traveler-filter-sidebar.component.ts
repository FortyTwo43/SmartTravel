import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import type { ExploreFilter } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { INTERESTS } from '../../../../../presentation/constants/interests.constant';
import { 
  LucideAngularModule, 
  LUCIDE_ICONS, 
  LucideIconProvider, 
  Activity,
  Utensils,
  Landmark,
  Leaf,
  Umbrella, 
  Mountain, 
  BookOpen,
  Monitor,
  Coffee,
  Camera,
  Compass,
  Star 
} from 'lucide-angular';

@Component({
  selector: 'app-traveler-filter-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ 
        Activity,
        Utensils,
        Landmark,
        Leaf,
        Umbrella, 
        Mountain, 
        BookOpen,
        Monitor,
        Coffee,
        Camera,
        Compass,
        Star 
      })
    }
  ],
  templateUrl: './traveler-filter-sidebar.component.html',
  styleUrl: './traveler-filter-sidebar.component.css'
})
export class TravelerFilterSidebarComponent {
  @Output() applyFilters = new EventEmitter<ExploreFilter>();

  // Constante de intereses disponibles
  readonly INTERESTS = INTERESTS;
  readonly VISIBLE_COUNT = 6; // Mostrar 6 inicialmente

  // Signals
  intereses = signal<string[]>([]); // IDs de intereses seleccionados
  isExpandedIntereses = signal<boolean>(false);
  experiencia = signal<string | null>(null);
  paises = signal<string[]>([]);
  ratingFilter = signal<'4-5' | '3-1' | null>(null);

  // Computed: mostrar 6 u 11 intereses según estado expandido
  visibleIntereses = computed(() => {
    const expanded = this.isExpandedIntereses();
    return expanded ? this.INTERESTS : this.INTERESTS.slice(0, this.VISIBLE_COUNT);
  });

  // Computed: cantidad de intereses ocultos
  hiddenInteresesCount = computed(() => {
    return this.INTERESTS.length - this.VISIBLE_COUNT;
  });

  toggleIntereses(interesId: string) {
    const current = this.intereses();
    if (current.includes(interesId)) {
      this.intereses.set(current.filter(i => i !== interesId));
    } else {
      this.intereses.set([...current, interesId]);
    }
    this.emitFilters();
  }

  toggleExpandIntereses() {
    this.isExpandedIntereses.update(v => !v);
  }

  setRating(rating: '4-5' | '3-1' | null) {
    if (this.ratingFilter() === rating) {
      this.ratingFilter.set(null); // deselect
    } else {
      this.ratingFilter.set(rating);
    }
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

  togglePais(pais: string) {
    const current = this.paises();
    if (current.includes(pais)) {
      this.paises.set(current.filter(p => p !== pais));
    } else {
      this.paises.set([...current, pais]);
    }
    this.emitFilters();
  }

  clearFilters() {
    this.intereses.set([]);
    this.isExpandedIntereses.set(false);
    this.experiencia.set(null);
    this.ratingFilter.set(null);
    this.paises.set([]);
    this.emitFilters();
  }

  emitFilters() {
    const ratingRanges = this.ratingFilter() === '4-5' 
      ? { ratingMin: 4, ratingMax: 5 }
      : this.ratingFilter() === '3-1'
      ? { ratingMin: 1, ratingMax: 3 }
      : {};

    const payload: ExploreFilter = {
      paises: this.paises().length ? this.paises() : undefined,
      categorias: this.intereses().length ? this.intereses() : undefined,
      experiencia: this.experiencia() ?? undefined,
      ...ratingRanges
    } as ExploreFilter;
    this.applyFilters.emit(payload);
  }
}
