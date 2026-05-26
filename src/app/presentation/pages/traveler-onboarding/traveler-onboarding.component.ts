import { Component, inject, signal, computed, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Check, ChevronRight } from 'lucide-angular';

import { InitializePerfilViajeroUseCase } from '../../../useCase/traveler/InitializePerfilViajeroUseCase';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { Footer } from '../../layouts/footer/footer';

@Component({
  selector: 'app-traveler-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LucideAngularModule,
    ButtonComponent,
    Footer
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Check, ChevronRight })
    }
  ],
  templateUrl: './traveler-onboarding.component.html',
  styleUrl: './traveler-onboarding.component.css',
  host: {
    '[attr.style]': '"--primary: #0288D1"'
  }
})
export class TravelerOnboardingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly initializeUseCase = inject(InitializePerfilViajeroUseCase);
  private readonly cdr = inject(ChangeDetectorRef);

  // Form state
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      presupuesto: [4500, [Validators.required, Validators.min(500), Validators.max(10000)]]
    });
  }

  ngOnInit(): void {
    // Usar Promise.resolve() para ejecutar en el siguiente microtask
    Promise.resolve().then(() => {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  // Intereses (checkboxes)
  readonly INTERESTS = signal([
    { id: 'deportes', label: 'TRAVELER_ONBOARDING.INTERESTS.SPORTS', icon: 'sports_soccer' },
    { id: 'cocina', label: 'TRAVELER_ONBOARDING.INTERESTS.CUISINE', icon: 'restaurant' },
    { id: 'cultura', label: 'TRAVELER_ONBOARDING.INTERESTS.CULTURE', icon: 'museum' },
    { id: 'naturaleza', label: 'TRAVELER_ONBOARDING.INTERESTS.NATURE', icon: 'eco' },
    { id: 'playa', label: 'TRAVELER_ONBOARDING.INTERESTS.BEACH', icon: 'water' },
    { id: 'montaña', label: 'TRAVELER_ONBOARDING.INTERESTS.MOUNTAIN', icon: 'terrain' },
    { id: 'historia', label: 'TRAVELER_ONBOARDING.INTERESTS.HISTORY', icon: 'history' },
    { id: 'tecnologia', label: 'TRAVELER_ONBOARDING.INTERESTS.TECHNOLOGY', icon: 'computer' },
    { id: 'gastronomia', label: 'TRAVELER_ONBOARDING.INTERESTS.GASTRONOMY', icon: 'lunch_dining' },
    { id: 'fotografia', label: 'TRAVELER_ONBOARDING.INTERESTS.PHOTOGRAPHY', icon: 'photo_camera' },
    { id: 'ecoturismo', label: 'TRAVELER_ONBOARDING.INTERESTS.ECOTOURISM', icon: 'forest' },
  ]);

  selectedInterests = signal<string[]>(['cocina', 'naturaleza', 'tecnologia']);

  // Travel type pills
  readonly TRAVEL_TYPES = signal([
    { id: 'solo', label: 'TRAVELER_ONBOARDING.TRAVEL_TYPE.SOLO' },
    { id: 'pareja', label: 'TRAVELER_ONBOARDING.TRAVEL_TYPE.COUPLE' },
    { id: 'familia', label: 'TRAVELER_ONBOARDING.TRAVEL_TYPE.FAMILY' },
    { id: 'amigos', label: 'TRAVELER_ONBOARDING.TRAVEL_TYPE.FRIENDS' }
  ]);

  selectedTravelType = signal<'solo' | 'pareja' | 'familia' | 'amigos'>('pareja');

  // Loading and error states
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Computed budget display
  budgetFormatted = computed(() => {
    const val = this.form.get('presupuesto')?.value || 0;
    return `€${val.toLocaleString('es-ES')}`;
  });

  /**
   * Toggle interest selection
   */
  toggleInterest(id: string): void {
    this.selectedInterests.update(interests => {
      if (interests.includes(id)) {
        return interests.filter(i => i !== id);
      } else {
        return [...interests, id];
      }
    });
  }

  /**
   * Check if interest is selected
   */
  isInterestSelected(id: string): boolean {
    return this.selectedInterests().includes(id);
  }

  /**
   * Set travel type
   */
  setTravelType(type: string): void {
    if (['solo', 'pareja', 'familia', 'amigos'].includes(type)) {
      this.selectedTravelType.set(type as 'solo' | 'pareja' | 'familia' | 'amigos');
    }
  }

  /**
   * Handle finalize configuration
   */
  async onFinalize(): Promise<void> {
    if (!this.form.valid || this.selectedInterests().length === 0) {
      this.errorMessage.set('TRAVELER_ONBOARDING.ERROR_VALIDATION');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const result = await this.initializeUseCase.execute({
        intereses: this.selectedInterests().join(','),
        tipoViaje: this.selectedTravelType(),
        presupuesto: this.form.get('presupuesto')?.value || 0,
        idioma: 'es'
      });

      if (result.success) {
        // Redirect to traveler dashboard/home
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set(result.message || 'TRAVELER_ONBOARDING.ERROR_SAVE');
      }
    } catch (error: any) {
      console.error('Error finalizing onboarding:', error);
      this.errorMessage.set('TRAVELER_ONBOARDING.ERROR_UNKNOWN');
    } finally {
      this.isLoading.set(false);
    }
  }
}
