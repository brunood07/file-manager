import { BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { FilesRepository } from '../repositories/files-repository';

export interface UploadFileUseCaseRequest {
  blobName: string;
  buffer: Buffer;
  userId: string;
}

interface UploadFileUseCaseResponse {
  upload: BlobUploadCommonResponse;
}

export class UploadFileUseCase {
    constructor(private filesRepository: FilesRepository) {}

    execute = async (data: UploadFileUseCaseRequest): Promise<UploadFileUseCaseResponse> => {
        const { blobName, buffer, userId } = data;

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!sasToken) throw Error('Azure Storage accountKey not found');
  
        const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken}`;
  
        const blobServiceClient = new BlobServiceClient(blobServiceUri);
        const containerName = 'files';
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = await containerClient.getBlockBlobClient(blobName);
        const upload = await blobClient.uploadData(buffer);

        if (!upload) {
            throw new Error('Upload failed');
        }

        const createFileData = {
            file_reference: blobName,
            user_id: userId
        };
  
        await this.filesRepository.create(createFileData);

        return {
            upload
        };
    };
}