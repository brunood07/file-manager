import { PrismaFilesRepository } from '../../../../file/repositories/prisma/prisma-files-repository';
import { ListFilesByUserUseCase } from '../../../../file/usecases/list-files-by-user-use-case';

export function makeListFilesByUserUseCase() {
  const filesRepository = new PrismaFilesRepository();
  const service = new ListFilesByUserUseCase(filesRepository);

  return service; 
}