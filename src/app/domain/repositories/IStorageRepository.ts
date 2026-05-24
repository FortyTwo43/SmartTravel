export interface IStorageRepository {
  upload(bucket: string, path: string, file: File): Promise<string>;
}
