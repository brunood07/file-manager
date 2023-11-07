import { PrismaUsersRepository } from '../../../../user/repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '../../../../user/usecases/authenticate-user-use-case';

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new AuthenticateUserUseCase(usersRepository);

  return service;
}