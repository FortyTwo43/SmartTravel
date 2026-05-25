/**
 * DTOs for Perfil entity
 */

export interface CreatePerfilDto {
  id?: string;
  nombre: string;
  apellido: string;
  rol: 'viajero' | 'proveedor' | 'admin';
  estado: 'activo' | 'inactivo';
  fecha_registro?: Date;
}

export interface UpdatePerfilDto {
  nombre?: string;
  apellido?: string;
  rol?: 'viajero' | 'proveedor' | 'admin';
  estado?: 'activo' | 'inactivo'
}
