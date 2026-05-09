import { Notificacion } from '../entities/Notificacion';
import { BaseRepository } from './BaseRepository';

export interface NotificacionRepository extends BaseRepository<Notificacion> {
	findByPerfilId(perfilId: string): Promise<Notificacion[]>;
	findUnreadByPerfilId(perfilId: string): Promise<Notificacion[]>;
	markAsRead(id: string): Promise<void>;
}
