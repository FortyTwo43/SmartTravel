import { Injectable, computed, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'smarttravel_favorites';
  private platformId = inject(PLATFORM_ID);
  
  // Signal para almacenar los IDs de los destinos favoritos
  private _favoriteIds = signal<Set<string>>(new Set());
  
  // Computed property expuesta
  favoriteIds = computed(() => this._favoriteIds());

  constructor() {
    this.loadFavorites();
    
    // Efecto para auto-guardar en localStorage cada vez que cambia el Set
    effect(() => {
      this.saveFavorites(this._favoriteIds());
    });
  }

  private loadFavorites(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const ids = JSON.parse(stored) as string[];
          this._favoriteIds.set(new Set(ids));
        } catch (e) {
          console.error('Error al cargar favoritos de localStorage', e);
        }
      }
    }
  }

  private saveFavorites(favorites: Set<string>): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    }
  }

  isFavorite(id: string): boolean {
    return this._favoriteIds().has(id);
  }

  toggleFavorite(id: string): void {
    this._favoriteIds.update(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
