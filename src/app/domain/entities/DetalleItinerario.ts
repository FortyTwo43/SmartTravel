export interface DetalleItinerario {
  id: string;
  id_itinerario: string;
  id_servicio_reservable: string;
  fecha: Date;
  hora: string;
  prioridad: 'alto' | 'medio' | 'bajo';
  estado: 'pendiente' | 'en_progreso' | 'completado';
}
