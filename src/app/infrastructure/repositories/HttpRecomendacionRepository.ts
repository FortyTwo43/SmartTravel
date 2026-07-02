import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Recomendacion } from '../../domain/entities/Recomendacion';
import { RECOMMENDATIONS_API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class HttpRecomendacionRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(RECOMMENDATIONS_API_URL);

  /**
   * Obtiene las recomendaciones del día para un perfil viajero específico.
   * POST /recommendations/today
   */
  async getTodayRecommendations(id_perfil: string): Promise<Recomendacion[]> {
    return firstValueFrom(
      this.http.post<Recomendacion[]>(`${this.apiUrl}/recommendations/today`, { id_perfil })
    );
  }
}
