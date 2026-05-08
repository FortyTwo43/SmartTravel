import { Destino } from '../../../domain/entities/Destino';
import { DestinoRepository } from '../../../domain/repositories/DestinoRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseDestinoRepository
  extends SupabaseBaseRepository<Destino>
  implements DestinoRepository {

  constructor() {
    super(supabase, 'destino');
  }
}
