/**
 * DTOs for Perfil entity
 */

export interface CreatePerfilDto {
  id?: string;
  nombre: string;
  apellido: string;
  rol: string;
  estado: string;
  fecha_registro?: Date;
}

export interface UpdatePerfilDto {
  nombre?: string;
  apellido?: string;
  rol?: string;
  estado?: string;
}
