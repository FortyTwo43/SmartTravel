export interface ProveedorServiceItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  comodidadesAdicionales: string;
  disponibilidad: boolean;
  establecimientoNombre: string;
  imagen?: string;
}
