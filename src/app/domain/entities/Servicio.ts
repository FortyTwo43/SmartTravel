export interface Servicio {
  id: string;
  id_proveedor: string;
  id_destino: string;
  nombre: string;
  tipo_servicio: string;
  descripcion: string;
  precio: number;
  disponibilidad: boolean;
  estado: string;
}
