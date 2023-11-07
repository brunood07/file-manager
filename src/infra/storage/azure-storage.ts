import { BlobServiceClient, BlobUploadCommonResponse, ContainerClient } from '@azure/storage-blob';
import { DownloadResponseProps, StorageInterface, UploadProps } from './storage';
import { env } from '../env';

export class AzureStorage implements StorageInterface {
  private containerClient: ContainerClient;

  constructor() {
    const accountName = env.AZURE_STORAGE_ACCOUNT_NAME;
    const sasToken = env.AZURE_STORAGE_SAS_TOKEN;
    if (!accountName) throw Error('Azure Storage accountName not found');
    if (!sasToken) throw Error('Azure Storage accountKey not found');
  
    const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken}`;
  
    const blobServiceClient = new BlobServiceClient(blobServiceUri);
    const containerName = 'files';
    this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  async upload(data: UploadProps): Promise<BlobUploadCommonResponse> {
    const { blobName, buffer } = data;
    const blobClient = await this.containerClient.getBlockBlobClient(blobName);
    const upload = await blobClient.uploadData(buffer);
    return upload;
  }

  async download(reference: string): Promise<DownloadResponseProps> {
    const blobClient = await this.containerClient.getBlobClient(reference);

    return {
      url: blobClient.url
    };
  }

  async delete(reference: string): Promise<void> {
    const blobClient = await this.containerClient.getBlockBlobClient(reference);
    await blobClient.deleteIfExists();
  }
}