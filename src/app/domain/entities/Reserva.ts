export interface Reserva {
  id: string;
  id_perfil: string;
  id_servicio: string;
  fecha_reserva: Date;
  cantidad_personas: number;
  precio_total: number;
  estado: string;
}
