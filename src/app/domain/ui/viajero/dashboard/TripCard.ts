export interface TripCard {
  id: string;
  destino: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'interes' | 'activo' | 'completado' | 'pausado';
}