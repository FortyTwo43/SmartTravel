import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { createAppConfig } from './app/app.config';
import { createSupabaseClient } from './app/infrastructure/database/supabase.client';

// Mock client for development without credentials
function createMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: {}, error: null }),
      signInWithPassword: async () => ({ data: {}, error: null }),
    },
  };
}

createSupabaseClient()
  .then((supabase) => bootstrapApplication(App, createAppConfig(supabase)))
  .catch((err) => {
    console.warn('Supabase initialization failed, using mock client', err);
    const mockClient = createMockSupabaseClient() as any;
    return bootstrapApplication(App, createAppConfig(mockClient));
  });
