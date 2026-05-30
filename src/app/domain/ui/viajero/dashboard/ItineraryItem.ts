export interface ItineraryItem {
  id: string;
  titulo: string;
  fecha: string;
  estado: 'interes' | 'activo' | 'completado' | 'pausado';
}