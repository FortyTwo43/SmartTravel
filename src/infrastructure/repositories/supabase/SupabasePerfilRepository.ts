import { Perfil } from '../../../domain/entities/Perfil';
import { PerfilRepository } from '../../../domain/repositories/PerfilRepository';
import { supabase } from '../../database/supabase.client';
import { SupabaseBaseRepository } from './SupabaseBaseRepository';

export class SupabasePerfilRepository 
  extends SupabaseBaseRepository<Perfil> 
  implements PerfilRepository {
  
  constructor() {
    super(supabase, 'perfil');
  }
}
