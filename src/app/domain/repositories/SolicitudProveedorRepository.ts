import { SolicitudProveedor } from '../entities/SolicitudProveedor';
import { BaseRepository } from './BaseRepository';

export interface SolicitudProveedorRepository extends BaseRepository<SolicitudProveedor> {
  findByPerfilId(perfilId: string): Promise<SolicitudProveedor[]>;
}
