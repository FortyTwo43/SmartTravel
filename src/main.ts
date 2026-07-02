import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { createAppConfig } from './app/app.config';
import { createAppRuntimeConfig } from './app/infrastructure/database/supabase.client';

createAppRuntimeConfig()
  .then(({ supabase, recommendationsApiUrl }) =>
    bootstrapApplication(App, createAppConfig(supabase, recommendationsApiUrl))
  )
  .catch((err) => {
    console.error('App initialization failed', err);
  });
