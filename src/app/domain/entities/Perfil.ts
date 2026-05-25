export interface Perfil {
  id: string;
  nombre: string;
  apellido: string;
  rol: 'viajero' | 'proveedor' | 'admin';
  fecha_registro: Date;
  estado: 'activo' | 'inactivo';
}
