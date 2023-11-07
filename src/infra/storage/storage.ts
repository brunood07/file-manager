import { BlobUploadCommonResponse } from '@azure/storage-blob';

export interface UploadProps {
  blobName: string;
  buffer: Buffer;
}

export interface DownloadResponseProps {
  url: string;
}

export interface StorageInterface {
  upload(data: UploadProps): Promise<BlobUploadCommonResponse>;
  download(reference: string): Promise<DownloadResponseProps>;
  delete(reference: string): Promise<void>;
}