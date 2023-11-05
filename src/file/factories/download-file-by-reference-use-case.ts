import { DownloadFileByReferenceUseCase } from '../usecases/download-file-by-reference-use-case';

export function makeDownloadFileByReferenceUseCase() {
    const service = new DownloadFileByReferenceUseCase();

    return service; 
}