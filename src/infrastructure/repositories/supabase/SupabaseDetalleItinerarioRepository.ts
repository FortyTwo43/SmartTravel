import { DetalleItinerario } from '../../../domain/entities/DetalleItinerario';
import { DetalleItinerarioRepository } from '../../../domain/repositories/DetalleItinerarioRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseDetalleItinerarioRepository 
  extends SupabaseBaseRepository<DetalleItinerario> 
  implements DetalleItinerarioRepository {
  
  constructor() {
    super(supabase, 'detalle_itinerario');
  }
}
