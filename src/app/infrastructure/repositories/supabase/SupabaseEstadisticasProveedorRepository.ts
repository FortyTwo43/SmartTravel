import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { EstadisticasProveedorRepository } from '../../../domain/repositories/EstadisticasProveedorRepository';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { IngresoPeriodo } from '../../../domain/ui/proveedor/estadisticas/IngresoPeriodo';
import { ReservaPeriodo } from '../../../domain/ui/proveedor/estadisticas/ReservaPeriodo';
import { ServicioMasReservado } from '../../../domain/ui/proveedor/estadisticas/ServicioMasReservado';
import { IngresoPorServicio } from '../../../domain/ui/proveedor/estadisticas/IngresoPorServicio';
import { ReservaPorEstado } from '../../../domain/ui/proveedor/estadisticas/ReservaPorEstado';
import { Reserva } from '../../../domain/entities/Reserva';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class SupabaseEstadisticasProveedorRepository implements EstadisticasProveedorRepository {
  constructor(private readonly supabase: SupabaseClient) { }

  private async fetchReservasPorEstablecimiento(idEstablecimiento: string) {
    const { data, error } = await this.supabase
      .from('reserva')
      .select(`
        *,
        servicio_reservable!inner (
          id,
          id_establecimiento,
          nombre
        )
      `)
      .eq('servicio_reservable.id_establecimiento', idEstablecimiento);

    if (error) {
      throw buildSupabaseError('fetchReservasPorEstablecimiento', 'reserva', error);
    }
    return data || [];
  }

  async getIngresosPorPeriodo(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes'): Promise<IngresoPeriodo[]> {
    const reservas = await this.fetchReservasPorEstablecimiento(idEstablecimiento);
    const agruparPor = (fecha: Date) => {
      if (periodo === 'dia') return fecha.toISOString().split('T')[0];
      if (periodo === 'mes') return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      // Semana (simplificado)
      const f = new Date(fecha);
      const dia = f.getDay();
      const diff = f.getDate() - dia + (dia === 0 ? -6 : 1); 
      const monday = new Date(f.setDate(diff));
      return monday.toISOString().split('T')[0];
    };

    const agrupado = reservas
      .filter(r => r.estado === 'aceptado')
      .reduce((acc: any, curr: any) => {
        const key = agruparPor(new Date(curr.fecha_reserva));
        acc[key] = (acc[key] || 0) + (curr.precio_total || 0);
        return acc;
      }, {});

    return Object.keys(agrupado).sort().map(key => ({
      fecha: key,
      ingresos: agrupado[key]
    }));
  }

  async getReservasRealizadas(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes'): Promise<ReservaPeriodo[]> {
    const reservas = await this.fetchReservasPorEstablecimiento(idEstablecimiento);
    const agruparPor = (fecha: Date) => {
      if (periodo === 'dia') return fecha.toISOString().split('T')[0];
      if (periodo === 'mes') return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      const f = new Date(fecha);
      const dia = f.getDay();
      const diff = f.getDate() - dia + (dia === 0 ? -6 : 1); 
      const monday = new Date(f.setDate(diff));
      return monday.toISOString().split('T')[0];
    };

    const agrupado = reservas.reduce((acc: any, curr: any) => {
      const key = agruparPor(new Date(curr.fecha_reserva));
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(agrupado).sort().map(key => ({
      fecha: key,
      cantidad_reservas: agrupado[key]
    }));
  }

  async getTopServicios(idEstablecimiento: string): Promise<ServicioMasReservado[]> {
    const reservas = await this.fetchReservasPorEstablecimiento(idEstablecimiento);
    const agrupado = reservas.reduce((acc: any, curr: any) => {
      const nombre = curr.servicio_reservable.nombre;
      acc[nombre] = (acc[nombre] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(agrupado)
      .map(key => ({ nombre_servicio: key, cantidad_reservas: agrupado[key] }))
      .sort((a, b) => b.cantidad_reservas - a.cantidad_reservas);
  }

  async getDistribucionIngresos(idEstablecimiento: string): Promise<IngresoPorServicio[]> {
    const reservas = await this.fetchReservasPorEstablecimiento(idEstablecimiento);
    let totalIngresos = 0;
    
    const agrupado = reservas
      .filter(r => r.estado === 'aceptado')
      .reduce((acc: any, curr: any) => {
        const nombre = curr.servicio_reservable.nombre;
        const ingreso = curr.precio_total || 0;
        acc[nombre] = (acc[nombre] || 0) + ingreso;
        totalIngresos += ingreso;
        return acc;
      }, {});

    return Object.keys(agrupado).map(key => ({
      nombre_servicio: key,
      total_ingresos: agrupado[key],
      porcentaje: totalIngresos > 0 ? (agrupado[key] / totalIngresos) * 100 : 0
    }));
  }

  async getReservasPorEstado(idEstablecimiento: string): Promise<ReservaPorEstado[]> {
    const reservas = await this.fetchReservasPorEstablecimiento(idEstablecimiento);
    const agrupado = reservas.reduce((acc: any, curr: any) => {
      const estado = curr.estado;
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(agrupado).map(key => ({
      estado: key,
      cantidad: agrupado[key]
    }));
  }
}
