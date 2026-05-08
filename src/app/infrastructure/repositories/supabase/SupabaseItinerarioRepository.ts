import { Itinerario } from '../../../domain/entities/Itinerario';
import { ItinerarioRepository } from '../../../domain/repositories/ItinerarioRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseItinerarioRepository
  extends SupabaseBaseRepository<Itinerario>
  implements ItinerarioRepository {

  constructor() {
    super(supabase, 'itinerario');
  }
}
