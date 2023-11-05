import { PrismaFilesRepository } from '../repositories/prisma/prisma-files-repository';
import { AzureStorage } from '../storage/azure-storage';
import { UploadFileUseCase } from '../usecases/upload-file-use-case';

export function makeUploadFileUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const service = new UploadFileUseCase(filesRepository, storage);

  return service; 
}