import { PrismaFilesRepository } from '../repositories/prisma/prisma-files-repository';
import { DeleteFileByReferenceUseCase } from '../usecases/delete-file-by-reference-use-case';

export function makeDeleteFileByReferenceUseCase() {
    const filesRepository = new PrismaFilesRepository();
    const service = new DeleteFileByReferenceUseCase(filesRepository);

    return service; 
}