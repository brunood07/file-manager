import { ResourceNotFoundError } from '../../../core/errors/resource-not-found';
import { StorageInterface } from '../../../infra/storage/storage';

interface DownloadFileByReferenceUseCaseRequest {
  file_reference: string;
}
interface DownloadFileByReferenceUseCaseResponse {
  fileUrl: string;
}

export class DownloadFileByReferenceUseCase {
  constructor(private storage: StorageInterface) {}

  execute = async (data: DownloadFileByReferenceUseCaseRequest): Promise<DownloadFileByReferenceUseCaseResponse> => {
    const { file_reference } = data;
    
    const { url } = await this.storage.download(file_reference);

    if (!url) {
      throw new ResourceNotFoundError();
    }
    
    return {
      fileUrl: url
    };
  };
}