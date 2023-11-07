import { ListFilesByUserUseCase } from '../../../../domain/file/usecases/list-files-by-user-use-case';
import { PrismaFilesRepository } from '../../../database/prisma-repositories/prisma-files-repository';

export function makeListFilesByUserUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const service = new ListFilesByUserUseCase(filesRepository);

  return service; 
}