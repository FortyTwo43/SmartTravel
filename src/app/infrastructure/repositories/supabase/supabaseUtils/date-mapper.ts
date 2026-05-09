/**
 * Generic date mapper utility for converting between Date objects and ISO strings
 * when interfacing with Supabase (which serializes dates as strings).
 */
export class DateMapper {
  /**
   * Converts a Date to ISO string for database storage, or returns the value as-is if already a string.
   */
  static toISOString(value: Date | string | undefined): string | undefined {
    if (!value) return undefined;
    return value instanceof Date ? value.toISOString() : value;
  }

  /**
   * Converts an ISO string or Date to a Date object.
   */
  static toDate(value: Date | string | undefined): Date | undefined {
    if (!value) return undefined;
    return value instanceof Date ? value : new Date(value as string);
  }

  /**
   * Maps a database row, converting specified date fields from strings to Date objects.
   * @param row The database row object
   * @param dateFields Array of field names that should be converted from string to Date
   */
  static mapFromRow<T extends Record<string, unknown>>(
    row: T,
    dateFields: (keyof T)[]
  ): T {
    const mapped = { ...row };
    for (const field of dateFields) {
      const value = mapped[field];
      if (value && typeof value === 'string') {
        mapped[field] = new Date(value) as any;
      }
    }
    return mapped;
  }

  /**
   * Maps an entity before writing to the database, converting specified Date fields to ISO strings.
   * @param item The entity object
   * @param dateFields Array of field names that should be converted from Date to ISO string
   */
  static mapToRow<T extends Record<string, unknown>>(
    item: Partial<T>,
    dateFields: (keyof T)[]
  ): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };
    for (const field of dateFields) {
      const value = mapped[field as string];
      if (value instanceof Date) {
        mapped[field as string] = value.toISOString();
      }
    }
    return mapped;
  }
}
