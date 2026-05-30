export interface PerfilViajero {
  id: string;
  intereses: string;
  presupuesto: number;
  idioma: string;
  tipo_viaje: 'solo' | 'pareja' | 'familia' | 'amigos';
}
