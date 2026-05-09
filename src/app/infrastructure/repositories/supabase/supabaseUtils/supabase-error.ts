import { PostgrestError } from '@supabase/supabase-js';

export function buildSupabaseError(
  operation: string,
  tableName: string,
  error: PostgrestError
): Error {
  const parts = [
    error.message,
    error.code ? `Code: ${error.code}` : '',
    error.details ? `Details: ${error.details}` : '',
    error.hint ? `Hint: ${error.hint}` : ''
  ].filter((part) => part.length > 0);

  return new Error(`Supabase error (${operation}) on table "${tableName}": ${parts.join(' ')}`);
}
