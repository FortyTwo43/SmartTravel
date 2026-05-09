/**
 * DTOs for Notificacion entity
 */

export interface CreateNotificacionDto {
  id_perfil: string;
  mensaje: string;
  leida: boolean;
}

export interface UpdateNotificacionDto {
  id_perfil?: string;
  mensaje?: string;
  leida?: boolean;
}
