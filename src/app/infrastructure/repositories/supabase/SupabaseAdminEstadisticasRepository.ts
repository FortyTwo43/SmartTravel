import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { AdminEstadisticasRepository } from '../../../domain/repositories/AdminEstadisticasRepository';
import {
  AdminEstadisticasData,
  AdminPeriodo,
  AdminStatPoint
} from '../../../domain/ui/admin/estadisticas/AdminEstadisticas';
import { buildSupabaseError } from './supabaseUtils/supabase-error';

type PerfilRow = {
  rol: 'viajero' | 'proveedor' | 'admin' | string | null;
  fecha_registro: string | null;
};

type ReservaRow = {
  id_servicio_reservable: string | null;
  fecha_reserva: string | null;
  estado: 'pendiente' | 'aceptado' | 'rechazado' | string | null;
};

type ServicioRow = {
  id: string;
  id_establecimiento: string | null;
};

type EstablecimientoRow = {
  id: string;
  id_destino: string | null;
};

type DestinoRow = {
  id: string;
  nombre: string | null;
  tipo_experiencia: string | null;
};

type SolicitudProveedorRow = {
  estado: 'pendiente' | 'aceptado' | 'rechazado' | string | null;
  fecha_solicitud: string | null;
};

@Injectable({
  providedIn: 'root'
})
export class SupabaseAdminEstadisticasRepository implements AdminEstadisticasRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEstadisticas(): Promise<AdminEstadisticasData> {
    const [
      perfiles,
      reservas,
      servicios,
      establecimientos,
      destinos,
      solicitudes
    ] = await Promise.all([
      this.fetchPerfiles(),
      this.fetchReservas(),
      this.fetchServicios(),
      this.fetchEstablecimientos(),
      this.fetchDestinos(),
      this.fetchSolicitudesProveedor()
    ]);

    return {
      crecimientoUsuarios: {
        dia: this.groupDates(perfiles, 'fecha_registro', 'dia'),
        semana: this.groupDates(perfiles, 'fecha_registro', 'semana'),
        mes: this.groupDates(perfiles, 'fecha_registro', 'mes')
      },
      distribucionUsuarios: this.buildUserDistribution(perfiles),
      destinosMasPopulares: this.buildDestinationReservations(reservas, servicios, establecimientos, destinos),
      tiposExperienciaMasReservados: this.buildExperienceTypeReservations(reservas, servicios, establecimientos, destinos),
      reservasPorDia: this.groupDates(reservas, 'fecha_reserva', 'dia'),
      reservasPorMes: this.groupDates(reservas, 'fecha_reserva', 'mes'),
      reservasPorEstado: this.buildReservationStatusDistribution(reservas),
      solicitudesProveedorPorEstado: this.buildProviderRequestStatusDistribution(solicitudes),
      solicitudesProveedorTemporal: [
        {
          name: 'ADMIN_STATISTICS.PROVIDERS_CHART.REQUESTS_RECEIVED',
          points: this.groupDates(solicitudes, 'fecha_solicitud', 'mes')
        },
        {
          name: 'ADMIN_STATISTICS.PROVIDERS_CHART.APPROVED_PROVIDERS',
          points: this.groupDates(
            solicitudes.filter(solicitud => solicitud.estado === 'aceptado'),
            'fecha_solicitud',
            'mes'
          )
        }
      ]
    };
  }

  private async fetchPerfiles(): Promise<PerfilRow[]> {
    const { data, error } = await this.supabase
      .from('perfil')
      .select('rol, fecha_registro');

    if (error) {
      throw buildSupabaseError('fetchPerfiles', 'perfil', error);
    }

    return data ?? [];
  }

  private async fetchReservas(): Promise<ReservaRow[]> {
    const { data, error } = await this.supabase
      .from('reserva')
      .select('id_servicio_reservable, fecha_reserva, estado');

    if (error) {
      throw buildSupabaseError('fetchReservas', 'reserva', error);
    }

    return data ?? [];
  }

  private async fetchServicios(): Promise<ServicioRow[]> {
    const { data, error } = await this.supabase
      .from('servicio_reservable')
      .select('id, id_establecimiento');

    if (error) {
      throw buildSupabaseError('fetchServicios', 'servicio_reservable', error);
    }

    return data ?? [];
  }

  private async fetchEstablecimientos(): Promise<EstablecimientoRow[]> {
    const { data, error } = await this.supabase
      .from('establecimiento_turistico')
      .select('id, id_destino');

    if (error) {
      throw buildSupabaseError('fetchEstablecimientos', 'establecimiento_turistico', error);
    }

    return data ?? [];
  }

  private async fetchDestinos(): Promise<DestinoRow[]> {
    const { data, error } = await this.supabase
      .from('destino')
      .select('id, nombre, tipo_experiencia');

    if (error) {
      throw buildSupabaseError('fetchDestinos', 'destino', error);
    }

    return data ?? [];
  }

  private async fetchSolicitudesProveedor(): Promise<SolicitudProveedorRow[]> {
    const { data, error } = await this.supabase
      .from('solicitud_proveedor')
      .select('estado, fecha_solicitud');

    if (error) {
      throw buildSupabaseError('fetchSolicitudesProveedor', 'solicitud_proveedor', error);
    }

    return data ?? [];
  }

  private groupDates<T extends Record<string, unknown>>(items: T[], dateKey: keyof T, periodo: AdminPeriodo): AdminStatPoint[] {
    const grouped = new Map<string, number>();

    for (const item of items) {
      const rawDate = item[dateKey];
      if (typeof rawDate !== 'string' && !(rawDate instanceof Date)) {
        continue;
      }

      const date = new Date(rawDate);
      if (Number.isNaN(date.getTime())) {
        continue;
      }

      const key = this.formatDatePeriod(date, periodo);
      grouped.set(key, (grouped.get(key) ?? 0) + 1);
    }

    return this.mapToSortedPoints(grouped);
  }

  private buildUserDistribution(perfiles: PerfilRow[]): AdminStatPoint[] {
    return this.buildFixedDistribution(perfiles.map(perfil => perfil.rol), [
      { key: 'viajero', label: 'ADMIN_STATISTICS.LABELS.TRAVELERS' },
      { key: 'proveedor', label: 'ADMIN_STATISTICS.LABELS.PROVIDERS' },
      { key: 'admin', label: 'ADMIN_STATISTICS.LABELS.ADMINS' }
    ]);
  }

  private buildReservationStatusDistribution(reservas: ReservaRow[]): AdminStatPoint[] {
    return this.buildFixedDistribution(reservas.map(reserva => reserva.estado), [
      { key: 'aceptado', label: 'ADMIN_STATISTICS.LABELS.COMPLETED' },
      { key: 'rechazado', label: 'ADMIN_STATISTICS.LABELS.CANCELED' },
      { key: 'pendiente', label: 'ADMIN_STATISTICS.LABELS.PENDING' }
    ]);
  }

  private buildProviderRequestStatusDistribution(solicitudes: SolicitudProveedorRow[]): AdminStatPoint[] {
    return this.buildFixedDistribution(solicitudes.map(solicitud => solicitud.estado), [
      { key: 'pendiente', label: 'ADMIN_STATISTICS.LABELS.PENDING' },
      { key: 'aceptado', label: 'ADMIN_STATISTICS.LABELS.APPROVED' },
      { key: 'rechazado', label: 'ADMIN_STATISTICS.LABELS.REJECTED' }
    ]);
  }

  private buildDestinationReservations(
    reservas: ReservaRow[],
    servicios: ServicioRow[],
    establecimientos: EstablecimientoRow[],
    destinos: DestinoRow[]
  ): AdminStatPoint[] {
    const grouped = new Map<string, number>();

    for (const reserva of reservas) {
      const destino = this.findDestinoForReservation(reserva, servicios, establecimientos, destinos);
      const name = destino?.nombre?.trim();
      if (!name) {
        continue;
      }

      grouped.set(name, (grouped.get(name) ?? 0) + 1);
    }

    return this.mapToSortedPoints(grouped, 'value').slice(0, 8);
  }

  private buildExperienceTypeReservations(
    reservas: ReservaRow[],
    servicios: ServicioRow[],
    establecimientos: EstablecimientoRow[],
    destinos: DestinoRow[]
  ): AdminStatPoint[] {
    const grouped = new Map<string, number>();

    for (const reserva of reservas) {
      const destino = this.findDestinoForReservation(reserva, servicios, establecimientos, destinos);
      const type = destino?.tipo_experiencia?.trim();
      if (!type) {
        continue;
      }

      const label = this.getExperienceTranslationKey(type);
      grouped.set(label, (grouped.get(label) ?? 0) + 1);
    }

    return this.mapToSortedPoints(grouped, 'value');
  }

  private findDestinoForReservation(
    reserva: ReservaRow,
    servicios: ServicioRow[],
    establecimientos: EstablecimientoRow[],
    destinos: DestinoRow[]
  ): DestinoRow | undefined {
    const servicio = servicios.find(item => item.id === reserva.id_servicio_reservable);
    const establecimiento = establecimientos.find(item => item.id === servicio?.id_establecimiento);

    return destinos.find(item => item.id === establecimiento?.id_destino);
  }

  private buildFixedDistribution(values: (string | null)[], items: { key: string; label: string }[]): AdminStatPoint[] {
    return items.map(item => ({
      label: item.label,
      value: values.filter(value => value === item.key).length
    }));
  }

  private formatDatePeriod(date: Date, periodo: AdminPeriodo): string {
    if (periodo === 'dia') {
      return date.toISOString().split('T')[0];
    }

    if (periodo === 'mes') {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);

    return weekStart.toISOString().split('T')[0];
  }

  private formatLabel(value: string): string {
    return value
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }

  private getExperienceTranslationKey(value: string): string {
    const keyMap: Record<string, string> = {
      deportes: 'TRAVELER_ONBOARDING.INTERESTS.SPORTS',
      cocina: 'TRAVELER_ONBOARDING.INTERESTS.CUISINE',
      cultura: 'TRAVELER_ONBOARDING.INTERESTS.CULTURE',
      naturaleza: 'TRAVELER_ONBOARDING.INTERESTS.NATURE',
      playa: 'TRAVELER_ONBOARDING.INTERESTS.BEACH',
      'montaña': 'TRAVELER_ONBOARDING.INTERESTS.MOUNTAIN',
      historia: 'TRAVELER_ONBOARDING.INTERESTS.HISTORY',
      tecnologia: 'TRAVELER_ONBOARDING.INTERESTS.TECHNOLOGY',
      gastronomia: 'TRAVELER_ONBOARDING.INTERESTS.GASTRONOMY',
      fotografia: 'TRAVELER_ONBOARDING.INTERESTS.PHOTOGRAPHY',
      ecoturismo: 'TRAVELER_ONBOARDING.INTERESTS.ECOTOURISM'
    };

    return keyMap[value] ?? this.formatLabel(value);
  }

  private mapToSortedPoints(grouped: Map<string, number>, sortBy: 'label' | 'value' = 'label'): AdminStatPoint[] {
    const points = Array.from(grouped.entries()).map(([label, value]) => ({ label, value }));

    if (sortBy === 'value') {
      return points.sort((a, b) => b.value - a.value);
    }

    return points.sort((a, b) => a.label.localeCompare(b.label));
  }
}
