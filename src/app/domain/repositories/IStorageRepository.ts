export interface IStorageRepository {
  upload(bucket: string, path: string, file: File): Promise<string>;
  getSignedUrl(bucket: string, path: string, expiresIn: number): Promise<string>;
}
