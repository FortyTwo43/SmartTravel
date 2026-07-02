import { Injectable, inject } from '@angular/core';
import { GetExplorarDestinosUseCase, ExploreDestination } from '../explorar-destinos/GetExplorarDestinosUseCase';

@Injectable({ providedIn: 'root' })
export class GetFavoritosUseCase {
  private readonly getExplorarDestinos = inject(GetExplorarDestinosUseCase);

  async execute(favoriteIds: Set<string>): Promise<ReadonlyArray<ExploreDestination>> {
    if (favoriteIds.size === 0) return [];
    
    // Obtenemos todos los destinos (en un caso real se filtraría en BD con 'in')
    // y los filtramos por los IDs favoritos.
    const allDestinations = await this.getExplorarDestinos.execute();
    return allDestinations.filter(d => favoriteIds.has(d.id));
  }
}
