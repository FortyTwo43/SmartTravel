import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './infrastructure/database/supabase.client';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: SupabaseClient, useValue: supabase }
  ]
};
