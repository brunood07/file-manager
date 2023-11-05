import { BlobServiceClient } from "@azure/storage-blob";
import { FilesRepository } from "../repositories/files-repository";

interface DeleteFileByReferenceUseCaseRequest {
  file_reference: string;
}

interface DeleteFileByReferenceUseCaseResponse {}

export class DeleteFileByReferenceUseCase {
  constructor(private filesRepository: FilesRepository) {}

  execute = async (data: DeleteFileByReferenceUseCaseRequest) => {
    const { file_reference } = data;

    const file = await this.filesRepository.findByReference(file_reference);

    if (!file) {
      throw new Error("File not found");
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
    if (!accountName) throw Error('Azure Storage accountName not found');
    if (!sasToken) throw Error('Azure Storage accountKey not found');
  
    const blobServiceUri = `https://${accountName}.blob.core.windows.net?${sasToken}`;
  
    const blobServiceClient = new BlobServiceClient(blobServiceUri);
    const containerName = "files";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = await containerClient.getBlockBlobClient(file_reference);
    await blobClient.deleteIfExists(),
    await this.filesRepository.deleteById(file.id)
  }
}