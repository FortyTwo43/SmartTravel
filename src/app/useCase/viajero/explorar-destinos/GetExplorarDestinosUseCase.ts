import { Injectable, inject } from '@angular/core';
import { Destino } from '../../../domain/entities/Destino';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';

/**
 * Use case: obtiene destinos reales desde Supabase aplicando filtros básicos
 * Sigue la arquitectura: UseCase -> Repository -> SupabaseRepository -> DB
 */

export interface ExploreFilter {
  experiencia?: Destino['tipo_experiencia'];
  categorias?: string[]; // Búsqueda textual en descripcion, nombre o tipo_experiencia
  paises?: string[];
  ratingMin?: number; // 3-1 estrellas (ratingMin=1, ratingMax=3)
  ratingMax?: number; // 4-5 estrellas (ratingMin=4, ratingMax=5)
}

export interface ExploreDestination extends Destino {
  readonly ratingPromedio?: number | null;
}

@Injectable({ providedIn: 'root' })
export class GetExplorarDestinosUseCase {
  private readonly destinoRepo = inject(SupabaseDestinoRepository);
  private readonly establecimientoRepo = inject(SupabaseEstablecimientoTuristicoRepository);

  /**
   * Ejecuta la búsqueda con filtros y paginación.
   * @param filter filtros opcionales
   * @param limit máximo por página (opcional)
   * @param offset desplazamiento (opcional)
   */
  async execute(filter?: ExploreFilter, limit?: number, offset?: number): Promise<ReadonlyArray<ExploreDestination>> {
    // 1) construir query de destinos aplicando filtros que existen en la tabla destino
    const query = this.destinoRepo;

    // Notar: SupabaseCrudRepository no expone un builder, así que usamos el cliente interno
    // accediendo al repositorio concreto (aceptado en este códigobase).

    // Realizamos la consulta directamente usando el cliente de Supabase inyectado en el repo
    // para poder aplicar range/limit y filtros.
    // @ts-ignore - acceso a la propiedad protegida 'supabase' en la implementación concreta
    const supabase = (this.destinoRepo as any).supabase;

    let sb = supabase.from('destino').select('*');

    if (filter?.experiencia) {
      sb = sb.eq('tipo_experiencia', filter.experiencia);
    }

    if (filter?.paises && filter.paises.length > 0) {
      sb = sb.in('pais', filter.paises);
    }

    if (filter?.categorias && filter.categorias.length > 0) {
      const orConditions = filter.categorias.map(cat => 
        `tipo_experiencia.ilike.%${cat}%,descripcion.ilike.%${cat}%,nombre.ilike.%${cat}%`
      ).join(',');
      sb = sb.or(orConditions);
    }

    if (typeof offset === 'number' && typeof limit === 'number') {
      sb = sb.range(offset, offset + limit - 1);
    } else if (typeof limit === 'number') {
      sb = sb.limit(limit);
    }

    const { data: destinosRows, error } = await sb;
    if (error) throw error;

    const destinos: ExploreDestination[] = (destinosRows ?? []).map((r: any) => ({ ...r }));

    // 2) Para cada destino obtener el rating promedio
    await Promise.all(destinos.map(async (d, idx) => {
      try {
        const establecimientos = await this.establecimientoRepo.findByDestinoId(d.id);
        let totalRating = 0;
        let countRating = 0;

        for (const est of establecimientos) {
          // Calcular rating promedio
          if (est.rating != null) {
            totalRating += est.rating;
            countRating++;
          }
        }

        const ratingPromedio = countRating > 0 ? totalRating / countRating : null;
        destinos[idx] = { ...d, ratingPromedio };
      } catch (e) {
        destinos[idx] = { ...d, ratingPromedio: null };
      }
    }));

    // 3) Aplicar filtros de rating en memoria
    let filtered = destinos;

    if (filter?.ratingMin != null || filter?.ratingMax != null) {
      filtered = filtered.filter(x => {
        const r = x.ratingPromedio ?? 0;
        const minOk = filter?.ratingMin == null || r >= filter.ratingMin;
        const maxOk = filter?.ratingMax == null || r <= filter.ratingMax;
        return minOk && maxOk;
      });
    }

    return filtered;
  }
}
