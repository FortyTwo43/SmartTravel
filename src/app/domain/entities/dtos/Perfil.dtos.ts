/**
 * DTOs for Perfil entity
 */

export interface CreatePerfilDto {
  nombre: string;
  apellido: string;
  rol: string;
  estado: string;
}

export interface UpdatePerfilDto {
  nombre?: string;
  apellido?: string;
  rol?: string;
  estado?: string;
}
