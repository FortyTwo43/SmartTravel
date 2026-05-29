import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { createAppConfig } from './app/app.config';
import { createSupabaseClient } from './app/infrastructure/database/supabase.client';

// Mock client for development without credentials
function createMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: { id: 'mock-user-id', email: 'mock@example.com', user_metadata: { rol: 'viajero' } } }, error: null }),
      getSession: async () => ({ data: { session: { access_token: 'mock-token' } }, error: null }),
      signUp: async () => ({ data: { user: { id: 'mock-user-id', email: 'mock@example.com', user_metadata: { rol: 'viajero' } }, session: { access_token: 'mock-token' } }, error: null }),
      signInWithPassword: async () => ({ data: { user: { id: 'mock-user-id', email: 'mock@example.com', user_metadata: { rol: 'viajero' } }, session: { access_token: 'mock-token' } }, error: null }),
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
