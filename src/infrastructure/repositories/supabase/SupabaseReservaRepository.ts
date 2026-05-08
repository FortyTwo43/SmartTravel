import { Reserva } from '../../../domain/entities/Reserva';
import { ReservaRepository } from '../../../domain/repositories/ReservaRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseReservaRepository 
  extends SupabaseBaseRepository<Reserva> 
  implements ReservaRepository {
  
  constructor() {
    super(supabase, 'reserva');
  }
}
