import { DeleteFileByReferenceUseCase } from '../../../../domain/file/usecases/delete-file-by-reference-use-case';
import { PrismaFilesRepository } from '../../../database/prisma-repositories/prisma-files-repository';
import { AzureStorage } from '../../../storage/azure-storage';

export function makeDeleteFileByReferenceUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const service = new DeleteFileByReferenceUseCase(filesRepository, storage);

  return service; 
}