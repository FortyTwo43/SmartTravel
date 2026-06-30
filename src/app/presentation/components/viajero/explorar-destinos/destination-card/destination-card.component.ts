import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { ExploreDestination } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Heart } from 'lucide-angular';
import { FavoritesService } from '../../../../service/favorites/favorites.service';

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
  
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);

  isFavorite = computed(() => {
    const dest = this.destination();
    return dest ? this.favoritesService.isFavorite(dest.id) : false;
  });

  toggleFavorite(): void {
    const dest = this.destination();
    if (dest) {
      this.favoritesService.toggleFavorite(dest.id);
    }
  }

  navigateToDetail(): void {
    const id = this.destination()?.id;
    if (id) {
      this.router.navigate(['/traveler/destinations', id]);
    }
  }
}
