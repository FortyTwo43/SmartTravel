import { Notificacion } from '../../../domain/entities/Notificacion';
import { NotificacionRepository } from '../../../domain/repositories/NotificacionRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabaseNotificacionRepository 
  extends SupabaseBaseRepository<Notificacion> 
  implements NotificacionRepository {
  
  constructor() {
    super(supabase, 'notificacion');
  }
}
