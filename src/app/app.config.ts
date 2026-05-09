import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

import { routes } from './app.routes';

export const createAppConfig = (supabase: SupabaseClient): ApplicationConfig => ({
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: SupabaseClient, useValue: supabase }
  ]
});
