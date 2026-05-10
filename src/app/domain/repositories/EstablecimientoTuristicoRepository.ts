import { EstablecimientoTuristico } from '../entities/EstablecimientoTuristico';
import { BaseRepository } from './BaseRepository';

export interface EstablecimientoTuristicoRepository extends BaseRepository<EstablecimientoTuristico> {
  findByProveedorId(proveedorId: string): Promise<EstablecimientoTuristico[]>;
  findByDestinoId(destinoId: string): Promise<EstablecimientoTuristico[]>;
}
