import { DownloadFileByReferenceUseCase } from '../../../../domain/file/usecases/download-file-by-reference-use-case';
import { AzureStorage } from '../../../storage/azure-storage';

export function makeDownloadFileByReferenceUseCase() {
  const storage = new AzureStorage();
  const service = new DownloadFileByReferenceUseCase(storage);

  return service; 
}