import { Component, EventEmitter, Output, signal, computed, input } from '@angular/core';
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
  Star,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  SlidersHorizontal
} from 'lucide-angular';

@Component({
  selector: 'app-traveler-filter-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
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
        Star,
        ChevronDown,
        ChevronUp,
        X,
        Plus,
        SlidersHorizontal
      })
    }
  ],
  templateUrl: './traveler-filter-sidebar.component.html',
  styleUrl: './traveler-filter-sidebar.component.css'
})
export class TravelerFilterSidebarComponent {
  @Output() applyFilters = new EventEmitter<ExploreFilter>();
  @Output() closeSheet = new EventEmitter<void>();

  // Input para controlar si está abierto en móvil (Bottom Sheet)
  isOpen = input<boolean>(false);

  // Constante de intereses disponibles
  readonly INTERESTS = INTERESTS;

  // Signals de filtros
  intereses = signal<string[]>([]);
  experiencia = signal<string | null>(null);
  paises = signal<string[]>([]);
  ratingFilter = signal<'4-5' | '3-1' | null>(null);

  // Accordion: sección activa (null = todas cerradas)
  expandedSection = signal<string | null>('paises');

  // Modal de intereses
  isInterestsModalOpen = signal<boolean>(false);

  toggleSection(section: string) {
    this.expandedSection.update(current => current === section ? null : section);
  }

  isSectionOpen(section: string): boolean {
    return this.expandedSection() === section;
  }

  openInterestsModal() {
    this.isInterestsModalOpen.set(true);
  }

  closeInterestsModal() {
    this.isInterestsModalOpen.set(false);
  }

  toggleIntereses(interesId: string) {
    const current = this.intereses();
    if (current.includes(interesId)) {
      this.intereses.set(current.filter(i => i !== interesId));
    } else {
      this.intereses.set([...current, interesId]);
    }
    this.emitFilters();
  }

  setRating(rating: '4-5' | '3-1' | null) {
    if (this.ratingFilter() === rating) {
      this.ratingFilter.set(null);
    } else {
      this.ratingFilter.set(rating);
    }
    this.emitFilters();
  }

  setExperiencia(exp: string | null) {
    if (this.experiencia() === exp) {
      this.experiencia.set(null);
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

  onApplyAndClose() {
    this.emitFilters();
    this.closeSheet.emit();
  }

  // Computed para chip resumen de intereses seleccionados
  selectedInteresesLabels = computed(() =>
    this.INTERESTS.filter(i => this.intereses().includes(i.id)).map(i => i.label)
  );

  activeFiltersCount = computed(() => {
    let count = 0;
    if (this.paises().length) count++;
    if (this.intereses().length) count++;
    if (this.ratingFilter()) count++;
    if (this.experiencia()) count++;
    return count;
  });
}
