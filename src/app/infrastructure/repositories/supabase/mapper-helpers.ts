/**
 * Helper functions for common field mappings in Supabase repositories.
 * Reduces code duplication when dealing with Date fields and other transformations.
 */

/**
 * Map a date field to ISO string for database storage.
 * @param value - The date value (Date or string)
 * @returns ISO string representation or original value if falsy
 */
export function mapDateToIso(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

/**
 * Map a date field from database to Date instance.
 * @param value - The date value from database (Date or string)
 * @returns Date instance or original value if already a Date
 */
export function mapDateFromDb(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

/**
 * Create a field mapper for a single date property.
 * Usage: Creates object with mapped date field while spreading other properties.
 */
export function createDateFieldMapper<T>(fieldName: keyof T) {
  return (item: Partial<T>): Record<string, unknown> => {
    const mapped: Record<string, unknown> = { ...item };
    const dateValue = item[fieldName];

    if (dateValue !== undefined) {
      mapped[fieldName as string] = mapDateToIso(dateValue as Date | string);
    }

    return mapped;
  };
}
