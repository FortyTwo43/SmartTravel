import { createClient, SupabaseClient } from '@supabase/supabase-js';

type SupabaseRuntimeConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

const CONFIG_URL = '/config.json';

const normalizeConfig = (config: Partial<SupabaseRuntimeConfig>): SupabaseRuntimeConfig => {
  const supabaseUrl = (config.supabaseUrl ?? '').trim();
  const supabaseKey = (config.supabaseKey ?? '').trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase runtime config is missing supabaseUrl or supabaseKey.');
  }

  return { supabaseUrl, supabaseKey };
};

export const createSupabaseClient = async (): Promise<SupabaseClient> => {
  const response = await fetch(CONFIG_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load Supabase runtime config from ${CONFIG_URL}.`);
  }

  const config = (await response.json()) as Partial<SupabaseRuntimeConfig>;
  const { supabaseUrl, supabaseKey } = normalizeConfig(config);

  return createClient(supabaseUrl, supabaseKey);
};
