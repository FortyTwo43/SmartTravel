import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseRecomendacionRepository
  extends SupabaseBaseRepository<Recomendacion>
  implements RecomendacionRepository {

  constructor() {
    super(supabase, 'recomendacion');
  }
}
