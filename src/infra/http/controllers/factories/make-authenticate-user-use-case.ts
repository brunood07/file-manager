import { AuthenticateUserUseCase } from '../../../../domain/user/application/usecases/authenticate-user-use-case';
import { PrismaUsersRepository } from '../../../database/prisma-repositories/prisma-users-repository';

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new AuthenticateUserUseCase(usersRepository);

  return service;
}