export interface BaseRepository<T> {
  create(item: Omit<T, 'id'>): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  update(id: string, item: Partial<Omit<T, 'id'>>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
