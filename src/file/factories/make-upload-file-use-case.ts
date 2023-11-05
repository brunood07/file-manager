import { PrismaFilesRepository } from '../repositories/prisma/prisma-files-repository';
import { UploadFileUseCase } from '../usecases/upload-file-use-case';

export function makeUploadFileUseCase() {
    const filesRepository = new PrismaFilesRepository();
    const service = new UploadFileUseCase(filesRepository);

    return service; 
}