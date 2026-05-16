import { ServicioReservable } from '../entities/ServicioReservable';
import { BaseRepository } from './BaseRepository';

export interface ServicioReservableRepository extends BaseRepository<ServicioReservable> {
  findByEstablecimientoId(establecimientoId: string): Promise<ServicioReservable[]>;
}
