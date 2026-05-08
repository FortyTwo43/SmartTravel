import { Servicio } from '../../../domain/entities/Servicio';
import { ServicioRepository } from '../../../domain/repositories/ServicioRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseServicioRepository
  extends SupabaseBaseRepository<Servicio>
  implements ServicioRepository {

  constructor() {
    super(supabase, 'servicio');
  }
}
