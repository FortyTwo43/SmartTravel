/**
 * DTOs for ServicioReservable entity
 */

export interface CreateServicioReservableDto {
  id_establecimiento: string;
  nombre: string;
  precio: number;
  descripcion: string;
  comodidades_adicionales: string;
  disponibilidad: boolean;
  imagen: string;
}

export interface UpdateServicioReservableDto {
  id_establecimiento?: string;
  nombre?: string;
  precio?: number;
  descripcion?: string;
  comodidades_adicionales?: string;
  disponibilidad?: boolean;
  imagen?: string;
}
