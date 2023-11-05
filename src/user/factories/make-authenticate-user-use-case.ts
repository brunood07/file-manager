import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '../usecases/authenticate-user-use-case';

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new AuthenticateUserUseCase(usersRepository);

  return service;
}