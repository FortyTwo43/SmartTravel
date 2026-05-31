import { Injectable, inject } from '@angular/core';
import { Destino } from '../../../domain/entities/Destino';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';

/**
 * Use case: obtiene destinos reales desde Supabase aplicando filtros básicos
 * Sigue la arquitectura: UseCase -> Repository -> SupabaseRepository -> DB
 */

export interface ExploreFilter {
  experiencia?: Destino['tipo_experiencia'];
  categorias?: string[]; // se mapeará a establecimiento.tipo si aplica
  minPrice?: number;
  maxPrice?: number;
}

export interface ExploreDestination extends Destino {
  readonly precioMinimo?: number | null;
}

@Injectable({ providedIn: 'root' })
export class GetExplorarDestinosUseCase {
  private readonly destinoRepo = inject(SupabaseDestinoRepository);
  private readonly establecimientoRepo = inject(SupabaseEstablecimientoTuristicoRepository);
  private readonly servicioRepo = inject(SupabaseServicioReservableRepository);

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

    // Si hay filtro de categoría (ej. hotel, tour), resolución: buscar destinos que tengan establecimientos de esos tipos
    if (filter?.categorias && filter.categorias.length > 0) {
      // buscar establecimientos que coincidan y obtener id_destino distinct
      const { data: ests, error: estError } = await (this.establecimientoRepo as any).supabase
        .from('establecimiento_turistico')
        .select('id_destino')
        .in('tipo', filter.categorias);

      if (estError) throw estError;
      const destinoIds = (ests ?? []).map((r: any) => r.id_destino).filter(Boolean);
      if (destinoIds.length === 0) return [];
      sb = sb.in('id', destinoIds);
    }

    if (typeof offset === 'number' && typeof limit === 'number') {
      sb = sb.range(offset, offset + limit - 1);
    } else if (typeof limit === 'number') {
      sb = sb.limit(limit);
    }

    const { data: destinosRows, error } = await sb;
    if (error) throw error;

    const destinos: ExploreDestination[] = (destinosRows ?? []).map((r: any) => ({ ...r }));

    // 2) Para cada destino obtener el precio mínimo entre servicios de sus establecimientos
    await Promise.all(destinos.map(async (d, idx) => {
      try {
        const establecimientos = await this.establecimientoRepo.findByDestinoId(d.id);
        let minPrice: number | null = null;
        for (const est of establecimientos) {
          const servicios = await this.servicioRepo.findByEstablecimientoId(est.id);
          for (const s of servicios) {
            if (s.precio != null && (minPrice === null || s.precio < minPrice)) {
              minPrice = s.precio;
            }
          }
        }
        destinos[idx] = { ...d, precioMinimo: minPrice };
      } catch (e) {
        destinos[idx] = { ...d, precioMinimo: null };
      }
    }));

    // 3) Aplicar filtros de precio en memoria (porque no siempre hay relación directa en la tabla destino)
    let filtered = destinos;
    if (filter?.minPrice != null) {
      filtered = filtered.filter(x => (x.precioMinimo ?? Number.POSITIVE_INFINITY) >= filter!.minPrice!);
    }
    if (filter?.maxPrice != null) {
      filtered = filtered.filter(x => (x.precioMinimo ?? Number.POSITIVE_INFINITY) <= filter!.maxPrice!);
    }

    return filtered;
  }
}
