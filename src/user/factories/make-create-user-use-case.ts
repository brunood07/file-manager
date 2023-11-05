import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../usecases/create-user-use-case';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new CreateUserUseCase(usersRepository);

  return service;
}