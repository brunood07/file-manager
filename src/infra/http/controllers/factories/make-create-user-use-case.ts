import { PrismaUsersRepository } from '../../../../user/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../../../../user/usecases/create-user-use-case';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new CreateUserUseCase(usersRepository);

  return service;
}