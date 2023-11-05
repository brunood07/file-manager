import { PrismaFilesRepository } from '../repositories/prisma/prisma-files-repository';
import { AzureStorage } from '../storage/azure-storage';
import { DeleteFileByReferenceUseCase } from '../usecases/delete-file-by-reference-use-case';

export function makeDeleteFileByReferenceUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const service = new DeleteFileByReferenceUseCase(filesRepository, storage);

  return service; 
}