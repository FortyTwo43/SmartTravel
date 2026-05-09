import { Reserva } from '../entities/Reserva';
import { BaseRepository } from './BaseRepository';

export interface ReservaRepository extends BaseRepository<Reserva> {
	findByPerfilId(perfilId: string): Promise<Reserva[]>;
}
