import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { createAppConfig } from './app/app.config';
import { createSupabaseClient } from './app/infrastructure/database/supabase.client';

createSupabaseClient()
  .then((supabase) => bootstrapApplication(App, createAppConfig(supabase)))
  .catch((err) => {
    console.error('Supabase initialization failed', err);
  });
