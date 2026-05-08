import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/* 
  Configuración del cliente de Supabase utilizando los environments de Angular.
*/

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);
