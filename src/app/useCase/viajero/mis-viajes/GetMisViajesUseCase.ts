import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Booking {
  id: string;
  type: 'HOTEL' | 'TOUR' | 'FLIGHT';
  name: string;
  dates: string;
  location: string;
  status: 'Confirmado' | 'Pendiente' | 'Completado' | 'Cancelado';
  price?: number;
  imageUrl: string;
  actionLabel: string;
}

export interface MisViajesData {
  upcoming: Booking[];
  history: Booking[];
}

@Injectable({ providedIn: 'root' })
export class GetMisViajesUseCase {
  private readonly supabase = inject(SupabaseClient);

  async execute(): Promise<MisViajesData> {
    // 1. Get the authenticated user
    const { data: authData } = await this.supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      return { upcoming: [], history: [] };
    }

    // 2. Fetch reservations for this user, joined with servicio_reservable
    const { data: reservas, error } = await this.supabase
      .from('reserva')
      .select(`
        id,
        fecha_reserva,
        cantidad_personas,
        precio_total,
        estado,
        servicio_reservable (
          id,
          nombre,
          imagen,
          descripcion,
          id_establecimiento
        )
      `)
      .eq('id_perfil', user.id)
      .order('fecha_reserva', { ascending: false });

    if (error || !reservas) {
      return { upcoming: [], history: [] };
    }

    const upcoming: Booking[] = [];
    const history: Booking[] = [];

    for (const r of reservas) {
      const servicio = (r as any).servicio_reservable;
      const fecha = r.fecha_reserva ? new Date(r.fecha_reserva as unknown as string) : null;
      const dateStr = fecha
        ? fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';

      // Map DB estado to display status
      let status: Booking['status'];
      let actionLabel: string;
      switch (r.estado) {
        case 'aceptado':
          status = 'Confirmado';
          actionLabel = 'Ver detalles';
          break;
        case 'pendiente':
          status = 'Pendiente';
          actionLabel = 'Ver Voucher';
          break;
        case 'rechazado':
          status = 'Cancelado';
          actionLabel = 'No disponible';
          break;
        default:
          status = 'Completado';
          actionLabel = 'Ver detalles';
      }

      const booking: Booking = {
        id: r.id,
        type: 'HOTEL',
        name: servicio?.nombre || 'Servicio',
        dates: dateStr,
        location: '',
        status,
        price: r.precio_total,
        // Only set imageUrl if the field is populated in the DB
        imageUrl: servicio?.imagen || '',
        actionLabel
      };

      const today = new Date();
      const isUpcoming = fecha ? fecha >= today : false;

      if (isUpcoming && r.estado !== 'rechazado') {
        upcoming.push(booking);
      } else {
        if (r.estado === 'rechazado') booking.status = 'Cancelado';
        else if (r.estado === 'aceptado') booking.status = 'Completado';
        history.push(booking);
      }
    }

    return { upcoming, history };
  }
}

