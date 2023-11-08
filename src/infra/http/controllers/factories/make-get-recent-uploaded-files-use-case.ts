import { GetRecenteUploadedFilesUseCase } from '../../../../domain/file/usecases/get-recent-uploaded-files-use-case';
import { AzureQueueConsumer } from '../../../queue/consumer/azure-queue-consumer';
import { AzureStorage } from '../../../storage/azure-storage';

export function makeGetRecentUploadedFilesUseCase() {
  const storage = new AzureStorage();
  const queue = new AzureQueueConsumer();
  const service = new GetRecenteUploadedFilesUseCase(storage, queue);

  return service; 
}