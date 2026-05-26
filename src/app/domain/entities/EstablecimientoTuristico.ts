export interface EstablecimientoTuristico {
  id: string;
  id_proveedor: string;
  id_destino: string;
  nombre: string;
  tipo: 'restaurante' | 'hotel' | 'tour';
  descripcion: string;
  estado: 'activo' | 'inactivo';
}
