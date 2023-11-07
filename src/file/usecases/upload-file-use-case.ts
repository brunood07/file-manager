import { BlobUploadCommonResponse } from '@azure/storage-blob';
import { FilesRepository } from '../repositories/files-repository';
import { StorageInterface } from '../../infra/storage/storage';

export interface UploadFileUseCaseRequest {
  blobName: string;
  buffer: Buffer;
  userId: string;
}

interface UploadFileUseCaseResponse {
  upload: BlobUploadCommonResponse;
}

export class UploadFileUseCase {
  constructor(private filesRepository: FilesRepository, private storage: StorageInterface) {}

  execute = async (data: UploadFileUseCaseRequest): Promise<UploadFileUseCaseResponse> => {
    const { blobName, buffer, userId } = data;

    const upload = await this.storage.upload({
      blobName,
      buffer
    });

    if (!upload) {
      throw new Error('Upload failed');
    }

    const createFileData = {
      file_reference: blobName,
      user_id: userId
    };
  
    this.filesRepository.create(createFileData);

    return {
      upload
    };
  };
}