import { AzureStorage } from '../../../storage/azure-storage';
import { PrismaFilesRepository } from '../../../../file/repositories/prisma/prisma-files-repository';
import { UploadFileUseCase } from '../../../../file/usecases/upload-file-use-case';

export function makeUploadFileUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const service = new UploadFileUseCase(filesRepository, storage);

  return service; 
}