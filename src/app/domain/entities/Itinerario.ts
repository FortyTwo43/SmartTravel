export interface Itinerario {
  id: string;
  id_perfil: string;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: 'interes' | 'activo' | 'completado' | 'pausado';
}
