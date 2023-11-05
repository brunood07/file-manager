import { AzureStorage } from '../storage/azure-storage';
import { DownloadFileByReferenceUseCase } from '../usecases/download-file-by-reference-use-case';

export function makeDownloadFileByReferenceUseCase() {
  const storage = new AzureStorage();
  const service = new DownloadFileByReferenceUseCase(storage);

  return service; 
}