import { QueueConsumerInterface } from '../../../infra/queue/consumer/queue-consumer';
import { StorageInterface } from '../../../infra/storage/storage';

export class GetRecenteUploadedFilesUseCase {
  constructor(private storage: StorageInterface, private queue: QueueConsumerInterface) {}

  execute = async () => {
    const messages = await this.queue.subscribe();
    
    const filesUrl = await Promise.all(messages.map(async (message: string) => {
      const file = await this.storage.download(message);
      return file.url;
    }));
    
    return filesUrl;
  };
}