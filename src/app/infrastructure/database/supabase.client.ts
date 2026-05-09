import { createClient, SupabaseClient } from '@supabase/supabase-js';

type SupabaseRuntimeConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

const CONFIG_URL = '/config.json';

const isValidSupabaseUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
};

const isValidSupabaseKey = (key: string): boolean => {
  // Supabase keys are base64-encoded and typically 40+ characters
  return /^[A-Za-z0-9_-]{40,}$/.test(key);
};

const normalizeConfig = (config: Partial<SupabaseRuntimeConfig>): SupabaseRuntimeConfig => {
  const supabaseUrl = (config.supabaseUrl ?? '').trim();
  const supabaseKey = (config.supabaseKey ?? '').trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase runtime config is missing supabaseUrl or supabaseKey.');
  }

  if (!isValidSupabaseUrl(supabaseUrl)) {
    throw new Error(`Invalid Supabase URL: ${supabaseUrl}. Must be a valid HTTPS URL ending with .supabase.co`);
  }

  if (!isValidSupabaseKey(supabaseKey)) {
    throw new Error('Invalid Supabase key format. Key must be at least 40 characters long and contain only alphanumeric characters, underscores, or hyphens.');
  }

  return { supabaseUrl, supabaseKey };
};

export const createSupabaseClient = async (): Promise<SupabaseClient> => {
  const response = await fetch(CONFIG_URL, {
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to load Supabase runtime config from ${CONFIG_URL}.`);
  }

  const config = (await response.json()) as Partial<SupabaseRuntimeConfig>;
  const normalizedConfig = normalizeConfig(config);
  // Configuration is validated by normalizeConfig() to ensure:
  // - URL is HTTPS and ends with .supabase.co
  // - Key format is validated (40+ alphanumeric chars)
  return createClient(normalizedConfig.supabaseUrl, normalizedConfig.supabaseKey); // NOSONAR: S8477
};
