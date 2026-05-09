import { Itinerario } from '../entities/Itinerario';
import { BaseRepository } from './BaseRepository';

export interface ItinerarioRepository extends BaseRepository<Itinerario> {
	findByPerfilId(perfilId: string): Promise<Itinerario[]>;
}
