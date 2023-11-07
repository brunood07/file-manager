import { UploadFileUseCase } from '../../../../domain/file/usecases/upload-file-use-case';
import { PrismaFilesRepository } from '../../../database/prisma-repositories/prisma-files-repository';
import { AzureQueueSender } from '../../../queue/sender/azure-queue-sender';
import { AzureStorage } from '../../../storage/azure-storage';

export function makeUploadFileUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const storage = new AzureStorage();
  const queue = new AzureQueueSender();
  const service = new UploadFileUseCase(filesRepository, storage, queue);

  return service; 
}