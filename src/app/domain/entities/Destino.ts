export interface Destino {
  id: string;
  nombre: string;
  ciudad: string;
  pais: string;
  descripcion: string;
  tipo_experiencia: 'aventura' | 'cultura' | 'naturaleza' | 'playa';
  imagen: string;
}
