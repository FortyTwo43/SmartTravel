import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

export interface TimelineEvent {
  id: string;
  type: 'FLIGHT' | 'ACCOMMODATION' | 'ACTIVITY' | 'DINING';
  title: string;
  subtitle: string;
  details: string;
  status: string;
  imageUrl: string;
  extraInfo?: string;
}

export interface ItineraryData {
  title: string;
  subtitle: string;
  activeMonth: string;
  activeDay: number;
  summary: {
    flights: number;
    accommodation: number;
    activities: number;
    total: number;
  };
  events: TimelineEvent[];
}

@Injectable({ providedIn: 'root' })
export class GetItinerariosUseCase {
  private readonly supabase = inject(SupabaseClient);

  async execute(): Promise<ItineraryData> {
    // 1. Get authenticated user
    const { data: authData } = await this.supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      return this.emptyItinerary();
    }

    // 2. Fetch the first active itinerary for this user
    const { data: itinerarios } = await this.supabase
      .from('itinerario')
      .select('*')
      .eq('id_perfil', user.id)
      .in('estado', ['activo', 'interes'])
      .order('fecha_inicio', { ascending: true })
      .limit(1);

    const itinerario = itinerarios?.[0];

    if (!itinerario) {
      return this.emptyItinerary();
    }

    // 3. Fetch detalles del itinerario joined with servicio_reservable
    const { data: detalles } = await this.supabase
      .from('detalle_itinerario')
      .select(`
        id,
        fecha,
        hora,
        prioridad,
        estado,
        servicio_reservable (
          id,
          nombre,
          imagen,
          descripcion,
          establecimiento_turistico (
            tipo
          )
        )
      `)
      .eq('id_itinerario', itinerario.id)
      .order('fecha', { ascending: true });

    // 4. Build timeline events from detalles
    const events: TimelineEvent[] = (detalles ?? []).map((d: any) => {
      const servicio = d.servicio_reservable;
      const hora = d.hora ? `• ${d.hora}` : '';
      const tipoEstablecimiento = servicio?.establecimiento_turistico?.tipo;
      let eventType: 'FLIGHT' | 'ACCOMMODATION' | 'ACTIVITY' | 'DINING' = 'ACTIVITY';
      if (tipoEstablecimiento === 'hotel') eventType = 'ACCOMMODATION';
      else if (tipoEstablecimiento === 'restaurante') eventType = 'DINING';
      
      return {
        id: d.id,
        type: eventType,
        title: servicio?.nombre || 'Actividad',
        subtitle: servicio?.descripcion || '',
        details: d.fecha
          ? `${new Date(d.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })} ${hora}`
          : '',
        status: d.estado === 'completado' ? 'Confirmed' :
                d.estado === 'en_progreso' ? 'Booking Active' : 'Reserved',
        // Image only if the DB has it populated
        imageUrl: servicio?.imagen || '',
        extraInfo: d.prioridad ? `Prioridad: ${d.prioridad}` : undefined
      };
    });

    // 5. Build date info from itinerary
    const fechaInicio = itinerario.fecha_inicio
      ? new Date(itinerario.fecha_inicio)
      : new Date();

    const activeMonth = fechaInicio.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const activeDay = fechaInicio.getDate();

    return {
      title: itinerario.nombre || 'Mi Itinerario',
      subtitle: `${fechaInicio.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })} — ${
        itinerario.fecha_fin
          ? new Date(itinerario.fecha_fin).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
          : ''}`,
      activeMonth,
      activeDay,
      summary: {
        flights: 0,
        accommodation: 0,
        activities: events.length,
        total: 0
      },
      events
    };
  }

  private emptyItinerary(): ItineraryData {
    return {
      title: 'Sin itinerarios',
      subtitle: 'Crea tu primer itinerario para comenzar',
      activeMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      activeDay: new Date().getDate(),
      summary: { flights: 0, accommodation: 0, activities: 0, total: 0 },
      events: []
    };
  }
}

