import { BlobServiceClient } from '@azure/storage-blob';

interface DownloadFileByReferenceUseCaseRequest {
  file_reference: string;
}
interface DownloadFileByReferenceUseCaseResponse {
  fileUrl: string;
}

export class DownloadFileByReferenceUseCase {
    execute = async (data: DownloadFileByReferenceUseCaseRequest): Promise<DownloadFileByReferenceUseCaseResponse> => {
        const { file_reference } = data;
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!sasToken) throw Error('Azure Storage accountKey not found');
  
        const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken}`;
  
        const blobServiceClient = new BlobServiceClient(blobServiceUri);
        const containerName = 'files';
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = await containerClient.getBlobClient(file_reference);
    
        return {
            fileUrl: blobClient.url
        };
    };
}