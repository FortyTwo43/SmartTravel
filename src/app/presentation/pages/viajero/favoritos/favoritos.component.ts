import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Heart } from 'lucide-angular';
import { FavoritesService } from '../../../../presentation/service/favorites/favorites.service';
import { GetFavoritosUseCase } from '../../../../useCase/viajero/favoritos/GetFavoritosUseCase';
import { ExploreDestination } from '../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { DestinationCardComponent } from '../../../components/viajero/explorar-destinos/destination-card/destination-card.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule, DestinationCardComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Heart })
    }
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  private readonly favoritesService = inject(FavoritesService);
  private readonly getFavoritosUseCase = inject(GetFavoritosUseCase);

  destinos = signal<ReadonlyArray<ExploreDestination>>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Exponemos la señal de IDs directamente si necesitamos reaccionar a la lista vacía instantáneamente
  favoriteIds = this.favoritesService.favoriteIds;

  constructor() {
    // Escuchar cambios en favoriteIds para recargar la lista de objetos completos si es necesario
    // Pero solo recargamos si cambió el tamaño del set para evitar requests infinitos
    effect(() => {
      const ids = this.favoriteIds();
      // En la práctica, como quitamos items de la vista local, no necesitamos refetch.
      // Solo actualizamos localmente
      this.destinos.update(current => current.filter(d => ids.has(d.id)));
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.loadFavoritos();
  }

  async loadFavoritos() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const ids = this.favoriteIds();
      const results = await this.getFavoritosUseCase.execute(ids);
      this.destinos.set(results);
    } catch (e) {
      this.error.set('No se pudieron cargar los favoritos.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
