import { Component, input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { ExploreDestination } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Heart } from 'lucide-angular';

@Component({
  selector: 'app-explore-destination-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, RouterModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ Heart })
    }
  ],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  destination = input<ExploreDestination | null>(null);
  isFavorite = signal(false);

  private readonly router = inject(Router);

  toggleFavorite(): void {
    this.isFavorite.set(!this.isFavorite());
  }

  navigateToDetail(): void {
    const id = this.destination()?.id;
    if (id) {
      this.router.navigate(['/traveler/destinations', id]);
    }
  }
}
