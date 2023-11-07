import { AzureStorage } from '../../../storage/azure-storage';
import { PrismaFilesRepository } from '../../../../file/repositories/prisma/prisma-files-repository';
import { DeleteFileByReferenceUseCase } from '../../../../file/usecases/delete-file-by-reference-use-case';

export function makeDeleteFileByReferenceUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const service = new DeleteFileByReferenceUseCase(filesRepository, storage);

  return service; 
}