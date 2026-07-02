import { Injectable, inject } from '@angular/core';
import { SupabasePerfilViajeroRepository } from '../../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabaseItinerarioRepository } from '../../../infrastructure/repositories/supabase/SupabaseItinerarioRepository';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { HttpRecomendacionRepository } from '../../../infrastructure/repositories/HttpRecomendacionRepository';
import { Itinerario } from '../../../domain/entities/Itinerario';
import { Destino } from '../../../domain/entities/Destino';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';
export type { DashboardData } from '../../../domain/ui/viajero/dashboard/DashboardData';
export type { DashboardStats } from '../../../domain/ui/viajero/dashboard/DashboardStats';
export type { TripCard } from '../../../domain/ui/viajero/dashboard/TripCard';
export type { ItineraryItem } from '../../../domain/ui/viajero/dashboard/ItineraryItem';
export type { DestinationCard } from '../../../domain/ui/viajero/dashboard/DestinationCard';
export type { ServiceCard } from '../../../domain/ui/viajero/dashboard/ServiceCard';
import { DashboardData } from '../../../domain/ui/viajero/dashboard/DashboardData';
import { DashboardStats } from '../../../domain/ui/viajero/dashboard/DashboardStats';
import { TripCard } from '../../../domain/ui/viajero/dashboard/TripCard';
import { ItineraryItem } from '../../../domain/ui/viajero/dashboard/ItineraryItem';
import { DestinationCard } from '../../../domain/ui/viajero/dashboard/DestinationCard';
import { ServiceCard } from '../../../domain/ui/viajero/dashboard/ServiceCard';

@Injectable({
  providedIn: 'root'
})
export class GetTravelerDashboardUseCase {
  private readonly perfilViajeroRepository = inject(SupabasePerfilViajeroRepository);
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly itinerarioRepository = inject(SupabaseItinerarioRepository);
  private readonly destinoRepository = inject(SupabaseDestinoRepository);
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);
  private readonly recomendacionRepository = inject(HttpRecomendacionRepository);

  /**
   * Obtiene datos reales del dashboard del viajero desde Supabase
   * y recomendaciones personalizadas del módulo de IA externo.
   */
  async execute(): Promise<DashboardData> {
    // Obtener usuario autenticado
    const { data: authData } = await this.authRepository.getCurrentUser();

    if (!authData?.user?.id) {
      return this.getEmptyDashboard('Viajero');
    }

    const userId = authData.user.id;
    const userName: string =
      authData.user.user_metadata?.['first_name'] ||
      authData.user.email?.split('@')[0] ||
      'Viajero';

    // Cargar datos en paralelo: itinerarios, destinos (para lookup), servicios, perfil y recomendaciones IA
    const [itinerarios, destinos, servicios, perfilViajero, recomendaciones] = await Promise.allSettled([
      this.itinerarioRepository.findByPerfilId(userId),
      this.destinoRepository.getAll(),
      this.servicioRepository.getAll(),
      this.perfilViajeroRepository.getById(userId),
      this.recomendacionRepository.getTodayRecommendations(userId)
    ]);

    const itinerariosData: Itinerario[] =
      itinerarios.status === 'fulfilled' ? itinerarios.value : [];
    const destinosData: Destino[] =
      destinos.status === 'fulfilled' ? destinos.value : [];
    const serviciosData: ServicioReservable[] =
      servicios.status === 'fulfilled' ? servicios.value : [];
    const perfilData =
      perfilViajero.status === 'fulfilled' ? perfilViajero.value : null;
    const recomendacionesData =
      recomendaciones.status === 'fulfilled' ? recomendaciones.value : [];

    // Separar itinerarios activos/futuros (próximos viajes) de los recientes
    const proximosViajes = itinerariosData
      .filter(i => i.estado === 'activo' || i.estado === 'interes')
      .slice(0, 3)
      .map(i => this.mapItinerarioToTripCard(i));

    const itinerariosRecientes = itinerariosData
      .slice(0, 5)
      .map(i => this.mapItinerarioToItineraryItem(i));

    // Construir mapa de destinos para lookup eficiente por id
    const destinosMap = new Map<string, Destino>(destinosData.map(d => [d.id, d]));

    // Mapear recomendaciones IA → DestinationCard con motivo
    let destinosRecomendados: DestinationCard[];
    if (recomendacionesData.length > 0) {
      destinosRecomendados = recomendacionesData
        .filter(r => destinosMap.has(r.id_destino))
        .map(r => this.mapRecomendacionToCard(r.id_destino, r.motivo, destinosMap));
    } else {
      // Fallback: mostrar destinos genéricos si el API de IA no está disponible
      destinosRecomendados = destinosData
        .slice(0, 6)
        .map(d => this.mapDestinoToCard(d));
    }

    const serviciosSugeridos = serviciosData
      .filter(s => s.disponibilidad)
      .slice(0, 3)
      .map(s => this.mapServicioToCard(s));

    const viajesCompletados = itinerariosData.filter(i => i.estado === 'completado').length;

    const estadisticas: DashboardStats = {
      viajes_completados: viajesCompletados,
      destinos_visitados: destinosData.length,
      presupuesto: perfilData?.presupuesto ?? 0
    };

    return {
      proximosViajes,
      destinosRecomendados,
      itinerariosRecientes,
      serviciosSugeridos,
      estadisticas,
      userName
    };
  }

  // ──────────────────────────────────────────
  // Mappers: entidades de dominio → interfaces del dashboard
  // ──────────────────────────────────────────

  private mapItinerarioToTripCard(itinerario: Itinerario): TripCard {
    return {
      id: itinerario.id,
      destino: itinerario.nombre,
      fecha_inicio: this.formatDate(itinerario.fecha_inicio),
      fecha_fin: this.formatDate(itinerario.fecha_fin),
      estado: itinerario.estado
    };
  }

  private mapItinerarioToItineraryItem(itinerario: Itinerario): ItineraryItem {
    return {
      id: itinerario.id,
      titulo: itinerario.nombre,
      fecha: this.formatDate(itinerario.fecha_inicio),
      estado: itinerario.estado
    };
  }

  private mapRecomendacionToCard(
    idDestino: string,
    motivo: string,
    destinosMap: Map<string, Destino>
  ): DestinationCard {
    const destino = destinosMap.get(idDestino)!;
    return {
      id: destino.id,
      nombre: destino.nombre,
      ciudad: destino.ciudad,
      pais: destino.pais,
      imagen: destino.imagen,
      tipo_experiencia: destino.tipo_experiencia,
      motivo
    };
  }

  private mapDestinoToCard(destino: Destino): DestinationCard {
    return {
      id: destino.id,
      nombre: destino.nombre,
      ciudad: destino.ciudad,
      pais: destino.pais,
      imagen: destino.imagen,
      tipo_experiencia: destino.tipo_experiencia
    };
  }

  private mapServicioToCard(servicio: ServicioReservable): ServiceCard {
    return {
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      disponibilidad: servicio.disponibilidad
    };
  }

  private formatDate(date: Date | string | null | undefined): string {
    if (!date) return '—';
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private getEmptyDashboard(userName: string): DashboardData {
    return {
      proximosViajes: [],
      destinosRecomendados: [],
      itinerariosRecientes: [],
      serviciosSugeridos: [],
      estadisticas: { viajes_completados: 0, destinos_visitados: 0, presupuesto: 0 },
      userName
    };
  }
}
