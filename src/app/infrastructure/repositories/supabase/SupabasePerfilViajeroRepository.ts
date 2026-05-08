import { PerfilViajero } from '../../../domain/entities/PerfilViajero';
import { PerfilViajeroRepository } from '../../../domain/repositories/PerfilViajeroRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabasePerfilViajeroRepository
  extends SupabaseBaseRepository<PerfilViajero>
  implements PerfilViajeroRepository {

  constructor() {
    super(supabase, 'perfil_viajero');
  }
}
