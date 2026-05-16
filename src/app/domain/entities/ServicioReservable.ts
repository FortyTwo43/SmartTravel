export interface ServicioReservable {
  id: string;
  id_establecimiento: string;
  nombre: string;
  precio: number;
  descripcion: string;
  comodidades_adicionales: string;
  disponibilidad: boolean;
}
